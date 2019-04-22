import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { Row, Col } from "reactstrap";

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
                    className="mb-4">
                    <Col xs="8">
                      <h1>Cart</h1>
                    </Col>
                    <Col
                      xs="4"
                      style={{ textAlign: "right", marginBottom: "1rem" }}>
                      {data.cart.count > 0 ? (
                        <button
                          className="StyledBtn"
                          onClick={() => props.checkoutClicked()}>
                          Checkout
                        </button>
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
