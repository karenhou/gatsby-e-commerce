import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import CartBtn from "../components/btns/cartBtn";
import {
  Card,
  CardImg,
  Col,
  Row,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from "reactstrap";
import Sidebar from "../components/sidebar";
import styled from "styled-components";
import { ApolloProvider } from "react-apollo";
import apolloClient from "../utils/apolloClient";

const MyCard = styled(Card)`
  display: block;
  padding: 10px 14px;
  font-size: 1em;
  box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  background: white;
`;

const CategoryHeader = styled.h1`
  padding: 1rem 0 1rem 0;
  color: #84bec9;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
`;

const ProductList = ({ products }) => {
  return products.map(product => {
    return (
      <Col
        xs={12}
        md={6}
        lg={4}
        key={product.node.contentful_id}
        className="mb-4">
        <MyCard>
          <CardImg
            top
            width="100%"
            src={product.node.photos[0].file.url}
            alt={product.node.photos[0].title}
          />
          <CardBody>
            <CardTitle>
              <Link
                to={`/${product.node.category.name}/${product.node.contentful_id}`}
                style={{ textDecoration: "none", color: "#84bec9" }}>
                {product.node.name}
              </Link>
            </CardTitle>
            <CardSubtitle>${product.node.price}</CardSubtitle>
            <CardText className="mt-3">
              <CartBtn product={product} />
            </CardText>
          </CardBody>
        </MyCard>
      </Col>
    );
  });
};

export default props => {
  const { allContentfulProducts } = props.data;

  const [isOpen, set] = useState(false);
  return (
    <ApolloProvider client={apolloClient}>
      <Wrapper>
        <Sidebar cat={props.pageContext.cat} collapsed={isOpen} />
        <section style={{ width: "100%", textAlign: "center" }}>
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <button
                type="button"
                id="sidebarCollapse"
                className={isOpen ? "navbar-btn active" : "navbar-btn"}
                onClick={() => set(state => !state)}>
                <span />
                <span />
                <span />
              </button>
            </div>
          </nav>
          <CategoryHeader>{props.pageContext.cat}</CategoryHeader>
          <Row className="mx-2" style={{ justifyContent: "left" }}>
            {allContentfulProducts.edges.length > 0 ? (
              <ProductList products={allContentfulProducts.edges} />
            ) : (
              <Col>
                <h1>Coming soon...</h1>
              </Col>
            )}
          </Row>
        </section>
      </Wrapper>
    </ApolloProvider>
  );
};

export const pageQuery = graphql`
  query findProduct($cat: String!) {
    allContentfulProducts(filter: { category: { name: { eq: $cat } } }) {
      edges {
        node {
          contentful_id
          name
          price
          inventory
          photos {
            title
            file {
              url
              fileName
            }
          }
          category {
            name
          }
        }
      }
    }
  }
`;
