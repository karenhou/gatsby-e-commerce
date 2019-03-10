import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Header from "../components/header";
import { ApolloProvider } from "react-apollo";
import apolloClient from "../utils/apolloClient";

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ApolloProvider client={apolloClient}>
        <Header />
        <main>{children}</main>
      </ApolloProvider>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
