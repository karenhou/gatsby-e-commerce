import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Landing from "../components/landing";
import Footer from "../components/footer";
import Categories from "../components/categories";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Landing />
    <Categories />
    <Footer />
  </Layout>
);

export default IndexPage;
