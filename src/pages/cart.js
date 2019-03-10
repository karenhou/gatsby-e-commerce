import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import CartItems from "../components/cartItem";

const Cart = () => {
  return (
    <Layout>
      <SEO title="Cart" />
      <CartItems />
    </Layout>
  );
};

export default Cart;
