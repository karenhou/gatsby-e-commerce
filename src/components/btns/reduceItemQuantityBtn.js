import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import StyledBtn from "../styled-components/styledBtn";

const cartQuery = gql`
  query {
    cart @client {
      __typename
      items
      count
    }
  }
`;

class ReduceItemQuantityBtn extends Component {
  handleReduceQuantity(client, data) {
    const { node } = this.props;
    const newCart = { ...data.cart };
    let items = JSON.parse(newCart.items);
    items = items !== null ? items : [];

    if (items !== null) {
      items.forEach((item, i) => {
        if (item.id === node.id) {
          items[i] = {
            id: node.id,
            name: node.name,
            price: node.price,
            image: node.image,
            quantity: item.quantity - 1
          };
          if (item.quantity - 1 === 0) {
            items.splice(i, 1);
            newCart.count = items.length;
          }
        }
      });
    }
    newCart.items = JSON.stringify(items);
    client.writeData({
      data: {
        cart: newCart
      }
    });
  }

  render() {
    return (
      <Query query={cartQuery}>
        {({ data }) => (
          <ApolloConsumer>
            {client => (
              <StyledBtn
                onClick={() => this.handleReduceQuantity(client, data)}>
                <i className="fas fa-minus" />
              </StyledBtn>
            )}
          </ApolloConsumer>
        )}
      </Query>
    );
  }
}

export default ReduceItemQuantityBtn;
