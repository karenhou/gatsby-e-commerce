import React from "react";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import AddItemQuantityBtn from "./AddItemQuantityBtn";
import ReduceItemQuantityBtn from "./reduceItemQuantityBtn";
import RemoveItemBtn from "./removeItemBtn";

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

const Item = ({ data }) => {
  const items = data.cart.items ? JSON.parse(data.cart.items) : [];
  return items.map(item => {
    return (
      <ListGroup key={item.id}>
        <ListGroupItem>
          <Row style={{ textAlign: "center", alignItems: "center" }}>
            <Col xs="3">
              <img src={item.image} alt="pix" style={{ maxWidth: "100px" }} />
            </Col>
            <Col xs="5">
              <Row>{item.name}</Row>
              <Row>${item.price}</Row>
            </Col>
            <Col xs="2">x {item.quantity}</Col>
            <Col xs="2">
              <AddItemQuantityBtn node={item} />
              <ReduceItemQuantityBtn node={item} />
              <RemoveItemBtn node={item} />
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  });
};

const CartItem = () => {
  return (
    <Query query={cartQuery}>
      {({ data }) => {
        return (
          <ApolloConsumer>
            {client => {
              return <Item data={data} />;
            }}
          </ApolloConsumer>
        );
      }}
    </Query>
  );
};
export default CartItem;
