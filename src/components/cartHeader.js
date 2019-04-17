import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { Row, Col, Button } from "reactstrap";

const cartQuery = gql`
  query {
    cart @client {
      __typename
      items
      count
    }
  }
`;

const CartHeader = props => {
  return (
    <Query query={cartQuery}>
      {({ loading, error, data }) => {
        return (
          <ApolloConsumer>
            {client => {
              if (loading === true) {
                return <h1>Loading</h1>;
              } else {
                return (
                  <Row
                    style={{ borderBottom: "solid 0.2rem #84bec9" }}
                    className="mb-3">
                    <Col xs="8">
                      <h1>Cart</h1>
                    </Col>
                    <Col
                      xs="4"
                      style={{ textAlign: "right", paddingTop: "0.5em" }}>
                      {data.cart.count > 0 ? (
                        <Button onClick={() => props.checkoutClicked()}>
                          Checkout
                        </Button>
                      ) : (
                        ""
                      )}
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
