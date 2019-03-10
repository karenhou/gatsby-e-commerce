import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { navigateTo } from "gatsby-link";
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
    let items = JSON.parse(newCart.items);
    items = items !== null ? items : [];
    // console.log("props ", this.props.product.node, node);
    newCart.count = items.length + 1;
    items.push({
      id: node.id,
      name: node.name,
      price: node.price,
      image: node.photos[0].file.url,
      quantity: 1
    });
    newCart.items = JSON.stringify(items);
    client.writeData({
      data: {
        cart: newCart
      }
    });
    setTimeout(() => navigateTo("/cart"), 600);
  }

  render() {
    return (
      <Query query={cartQuery}>
        {({ data }) => (
          <ApolloConsumer>
            {client => (
              <Button onClick={() => this.handleAddToCart(client, data)}>
                Add to cart
              </Button>
            )}
          </ApolloConsumer>
        )}
      </Query>
    );
  }
}

export default CartBtn;
