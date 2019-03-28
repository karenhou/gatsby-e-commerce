import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import CartItem from "../components/cartItem";
import { Container, Row, Col } from "reactstrap";
import CheckoutForm from "../components/checkoutForm";

const Checkout = () => {
  return (
    <Layout>
      <SEO title="Checkout" />
      <Container>
        <Row>
          <Col>
            <CartItem />
          </Col>
          <Col
            style={{
              border: "1px solid rgba(0,0,0,.125)",
              borderRadius: "0.25rem"
            }}>
            <CheckoutForm />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Checkout;
