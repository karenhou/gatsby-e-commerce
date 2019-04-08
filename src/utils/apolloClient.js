import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { CachePersistor } from "apollo-cache-persist";
import { onError } from "apollo-link-error";
import fetch from "isomorphic-unfetch";

import clientState from "./clientState";

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const GRAPHQL_URL = process.env.NODE_ENV
  ? "http://localhost:4000/graphql"
  : "http://localhost:4000/graphql";
const cache = new InMemoryCache();
const persistor = new CachePersistor({
  cache,
  storage: global.window.localStorage,
  debug: true
});
persistor.restore();

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      console.log("onError", graphQLErrors, networkError);
    }),
    clientState,
    new HttpLink({
      uri: GRAPHQL_URL,
      credentials: "same-origin"
    })
  ]),
  cache
});

// Purge persistor when the store was reset.
client.onResetStore(() => persistor.purge());

export default client;
