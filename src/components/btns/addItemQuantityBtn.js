import React, { Component } from "react";
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

class AddItemQuantityBtn extends Component {
  handleAddQuantity(client, data) {
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
            quantity: item.quantity + 1
          };
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
              <button
                className="StyledBtn"
                onClick={() => this.handleAddQuantity(client, data)}
                style={{ margin: "5px" }}>
                <i className="fas fa-plus" />
              </button>
            )}
          </ApolloConsumer>
        )}
      </Query>
    );
  }
}

export default AddItemQuantityBtn;
