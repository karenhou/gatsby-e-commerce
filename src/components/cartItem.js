import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

const cartQuery = gql`
  query {
    cart @client {
      __typename
      items
      count
    }
  }
`;

const CartItem = ({ data }) => {
  const items = data.cart.items ? JSON.parse(data.cart.items) : [];

  return items.map(item => {
    return (
      <div key={item.id}>
        <div>{item.name}</div>
        <div>{item.price}</div>
        <div>{item.quantity}</div>
      </div>
    );
  });
};

const CartItems = () => {
  return (
    <Query query={cartQuery}>
      {({ data }) => {
        return (
          <ApolloConsumer>
            {client => {
              return (
                <>
                  <h1>Cart</h1>
                  <CartItem data={data} />
                </>
              );
            }}
          </ApolloConsumer>
        );
      }}
    </Query>
  );
};

export default CartItems;
