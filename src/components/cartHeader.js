import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { Row, Col, Button } from "reactstrap";
import apolloClient from "../utils/apolloClient";
import { Link } from "@reach/router";

const cartQuery = gql`
  query {
    cart @client {
      __typename
      items
      count
    }
  }
`;

const HELLO = gql`
  mutation helloTest($id: String!) {
    testHello(id: $id) {
      name
    }
  }
`;

class CartHeader extends Component {
  handleCheckOut = values => {
    console.log("clicked" + values.id);
    apolloClient
      .mutate({
        mutation: HELLO,
        variables: values
      })
      .then(data => {
        console.log("then ", data);
      })
      .catch(() => {
        console.log("mutation error ");
      });
  };

  render() {
    return (
      <Query query={cartQuery}>
        {({ data }) => {
          return (
            <ApolloConsumer>
              {client => {
                return (
                  <Row>
                    {data.cart.count === 0 ? (
                      <Col xs="8">
                        <h1>Cart Empty</h1>
                      </Col>
                    ) : (
                      <>
                        <Col xs="8">
                          <h1>Cart</h1>
                        </Col>
                        <Col
                          xs="4"
                          style={{ textAlign: "right", paddingTop: "0.5em" }}>
                          {/* <Button
                              onClick={() =>
                                this.handleCheckOut({ id: "123" })
                              }>
                              Check Out
                            </Button> */}
                          <Button>
                            <Link
                              to="/checkout"
                              style={{
                                textDecoration: "none",
                                color: "white"
                              }}>
                              Checkout
                            </Link>
                          </Button>
                        </Col>
                      </>
                    )}
                  </Row>
                );
              }}
            </ApolloConsumer>
          );
        }}
      </Query>
    );
  }
}

export default CartHeader;
