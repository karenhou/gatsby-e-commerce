import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Landing from "../components/landing";
import Footer from "../components/footer";
import Categories from "../components/categories";
import Introduction from "../components/introduction";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Landing />
    <Introduction />
    <Categories />
    <Footer />
  </Layout>
);

export default IndexPage;
