import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";
import AddItemQuantityBtn from "./AddItemQuantityBtn";
import ReduceItemQuantityBtn from "./reduceItemQuantityBtn";
import RemoveItemBtn from "./removeItemBtn";

const cartQuery = gql`
  query {
    cart @client {
      __typename
      items
      count
    }
  }
`;

const CartItem = ({ data }) => {
  const items = data.cart.items ? JSON.parse(data.cart.items) : [];
  return items.map(item => {
    return (
      <ListGroup key={item.id}>
        <ListGroupItem>
          <Row style={{ textAlign: "center" }}>
            <Col xs="1" style={{ alignSelf: "center" }}>
              <img src={item.image} alt="pix" style={{ height: "50px" }} />
            </Col>
            <Col xs="7">
              <Row>{item.name}</Row>
              <Row>${item.price}</Row>
            </Col>
            <Col xs="2" style={{ alignSelf: "center" }}>
              x {item.quantity}
            </Col>
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

const CartItems = () => {
  return (
    <Query query={cartQuery}>
      {({ data }) => {
        return (
          <ApolloConsumer>
            {client => {
              return (
                <Container>
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
                          <Button>Check Out</Button>
                        </Col>
                      </>
                    )}
                  </Row>
                  <CartItem data={data} />
                </Container>
              );
            }}
          </ApolloConsumer>
        );
      }}
    </Query>
  );
};

export default CartItems;
