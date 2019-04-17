import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import AddItemQuantityBtn from "./btns/addItemQuantityBtn";
import ReduceItemQuantityBtn from "./btns/reduceItemQuantityBtn";
import RemoveItemBtn from "./btns/removeItemBtn";

import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { navigate } from "gatsby";
import styled from "styled-components";

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
  display: block;
  /* margin: 10px 0 20px 0; */
  padding: 10px 14px;
  font-size: 1em;
  box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  background: white;
`;

const Item = ({ data, calTotal, showCheckoutBtn, readOnly }) => {
  const items = data.cart.items ? JSON.parse(data.cart.items) : [];
  calTotal(items);

  return items.map(item => {
    return (
      <ItemListStyle key={item.id}>
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
            {readOnly ? (
              ""
            ) : (
              <>
                <AddItemQuantityBtn node={item} />
                <ReduceItemQuantityBtn node={item} />
                <RemoveItemBtn node={item} />
              </>
            )}
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
      setTimeout(() => this.setState({ total: newTotal, items }), 300);
    }
  }

  render() {
    return (
      <Query query={cartQuery}>
        {({ loading, error, data }) => {
          if (loading === true) {
            return <h1>Loading</h1>;
          }
          if (data.cart.count > 0) {
            return (
              <ApolloConsumer>
                {client => {
                  return (
                    <>
                      <Item
                        showCheckoutBtn={this.props.showCheckoutBtn}
                        readOnly={this.props.readOnly}
                        data={data}
                        calTotal={items => this.calculateTotal(items)}
                      />
                      {this.props.showCheckoutBtn ? (
                        <div className="mt-3" style={{ textAlign: "right" }}>
                          <Button
                            onClick={() =>
                              this.props.handlePayment(this.state)
                            }>
                            Proceed
                          </Button>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  );
                }}
              </ApolloConsumer>
            );
          } else if (data.cart.count === 0) {
            setTimeout(() => navigate("/"), 1000);
            return <h3>Empty cart. Redirect to home</h3>;
          }
        }}
      </Query>
    );
  }
}

export default CartItem;
