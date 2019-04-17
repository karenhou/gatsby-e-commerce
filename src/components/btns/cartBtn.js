import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { Button } from "reactstrap";

const cartQuery = gql`
  query {
    cart @client {
      __typename
      items
      count
    }
  }
`;

class CartBtn extends Component {
  handleAddToCart(client, data) {
    const { node } = this.props.product;
    const newCart = { ...data.cart };
    let matched = false;
    let items = JSON.parse(newCart.items);
    items = items !== null ? items : [];

    items.forEach((item, index) => {
      if (item.id === node.contentful_id) {
        items[index].quantity += 1;
        matched = true;
        return;
      }
    });

    if (matched !== true) {
      newCart.count = items.length + 1;
      items.push({
        id: node.contentful_id,
        name: node.name,
        price: node.price,
        image: node.photos[0].file.url,
        quantity: 1
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
                style={{ width: "100%", marginTop: "0" }}
                onClick={() => this.handleAddToCart(client, data)}>
                Add to cart
              </button>
            )}
          </ApolloConsumer>
        )}
      </Query>
    );
  }
}

export default CartBtn;
