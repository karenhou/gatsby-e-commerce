import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { Row, Col, Button } from "reactstrap";
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

const CartHeader = () => {
  return (
    <Query query={cartQuery}>
      {({ data }) => {
        return (
          <ApolloConsumer>
            {client => {
              if (data.cart.count > 0) {
                return (
                  <Row>
                    <Col xs="8">
                      <h1>Cart</h1>
                    </Col>
                    <Col
                      xs="4"
                      style={{ textAlign: "right", paddingTop: "0.5em" }}>
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
                  </Row>
                );
              } else {
                return (
                  <Row>
                    <Col>
                      <h1>Cart Empty</h1>
                    </Col>
                  </Row>
                );
              }
            }}
          </ApolloConsumer>
        );
      }}
    </Query>
  );
};

export default CartHeader;
