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

class removeItemBtn extends Component {
  handleRemoveItem(client, data) {
    const { node } = this.props;
    const newCart = { ...data.cart };
    let items = JSON.parse(newCart.items);
    items = items !== null ? items : [];
    if (items !== null) {
      items.forEach((item, i) => {
        if (item.id === node.id) {
          items.splice(i, 1);
          newCart.count = items.length;
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
                onClick={() => this.handleRemoveItem(client, data)}
                style={{ backgroundColor: "#ec7373" }}>
                <i className="fas fa-times" />
              </button>
            )}
          </ApolloConsumer>
        )}
      </Query>
    );
  }
}

export default removeItemBtn;
