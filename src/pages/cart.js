import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import CartHeader from "../components/cartHeader";
import CartItem from "../components/cartItem";
import { Container } from "reactstrap";

const Cart = () => {
  return (
    <Layout>
      <SEO title="Cart" />
      <Container>
        <CartHeader />
        <CartItem />
      </Container>
    </Layout>
  );
};

export default Cart;
