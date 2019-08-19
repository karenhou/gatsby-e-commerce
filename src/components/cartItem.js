import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { navigate } from "gatsby";
import styled from "styled-components";

import AddItemQuantityBtn from "./btns/addItemQuantityBtn";
import ReduceItemQuantityBtn from "./btns/reduceItemQuantityBtn";
import RemoveItemBtn from "./btns/removeItemBtn";

const cartQuery = gql`
  query {
    cart @client {
      __typename
      items
      count
    }
  }
`;

const ItemListStyle = styled.div`
  text-align: center;
  display: block;
  margin: 0 3rem;
  padding: 10px 14px;
  font-size: 1em;
  box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  background: white;
`;

const Item = ({ data, calTotal, readOnly }) => {
  const items = data.cart.items ? JSON.parse(data.cart.items) : [];
  calTotal(items);
  return items.map(item => {
    return (
      <ItemListStyle key={item.id}>
        <Row style={{ alignItems: "center" }}>
          <Col md={2}>
            <RemoveItemBtn node={item} />
          </Col>

          <Col md={4}>
            <img src={item.image} alt="pix" style={{ width: "10rem" }} />
          </Col>

          <Col md={4} className="mb-2">
            <h4>{item.name}</h4>${item.price}
          </Col>

          <Col md={2}>
            <AddItemQuantityBtn node={item} />
            <span className="mx-2 mt-2">{item.quantity} </span>
            <ReduceItemQuantityBtn node={item} />
          </Col>
        </Row>
      </ItemListStyle>
    );
  });
};

class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      total: 0
    };
  }
  calculateTotal(items) {
    const { total } = this.state;
    let newTotal = 0;

    items.forEach(item => {
      newTotal = newTotal + item.price * item.quantity;
    });
    if (total !== newTotal) {
      setTimeout(() => {
        this.setState({ total: newTotal, items });
        if (this.props.handlePayment) this.props.handlePayment(this.state);
      }, 300);
    }
  }

  render() {
    return (
      <Query query={cartQuery}>
        {({ loading, error, data }) => {
          if (loading === true) {
            return <Spinner color="primary" />;
          } else {
            if (data.cart.count > 0) {
              return (
                <ApolloConsumer>
                  {client => {
                    return (
                      <Item
                        readOnly={this.props.readOnly}
                        data={data}
                        calTotal={items => this.calculateTotal(items)}
                      />
                    );
                  }}
                </ApolloConsumer>
              );
            } else {
              setTimeout(() => navigate("/"), 1500);
              return (
                <Container className="mt-4">
                  <Row style={{ justifyContent: "center" }} className="mb-3">
                    <h1>Empty cart. Redirect to home</h1>
                  </Row>
                  <Row style={{ justifyContent: "center" }}>
                    <i
                      className="fas fa-shopping-cart"
                      style={{
                        fontSize: "20rem",
                        opacity: "0.2",
                        color: "gray"
                      }}
                    />
                  </Row>
                </Container>
              );
            }
          }
        }}
      </Query>
    );
  }
}

export default CartItem;
