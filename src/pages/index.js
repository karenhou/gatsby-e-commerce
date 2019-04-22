import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Landing from "../components/landing";
import Footer from "../components/footer";
import Categories from "../components/categories";
import Introduction from "../components/introduction";
import History from "../components/history";
const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Landing />
    <Introduction />
    <History />
    <Categories />
    <Footer />
  </Layout>
);

export default IndexPage;
