import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import CartBtn from "../components/btns/cartBtn";
import {
  Card,
  CardImg,
  Col,
  Row,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Container,
  CardLink
} from "reactstrap";
import styled from "styled-components";

const MyCard = styled(Card)`
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

const CategoryHeader = styled.h1`
  text-align: center;
  padding: 3rem 0 2rem 0;
  color: #84bec9;
`;

const ProductList = ({ products }) => {
  return products.map(product => {
    return (
      <Col xs={12} md={6} lg={4} key={product.node.contentful_id}>
        <MyCard>
          <CardImg
            top
            width="100%"
            src={product.node.photos[0].file.url}
            alt={product.node.photos[0].title}
          />
          <CardBody>
            <CardTitle>
              <CardLink
                href={`/${product.node.category.name}/${
                  product.node.contentful_id
                }`}
                style={{ textDecoration: "none", color: "#84bec9" }}>
                {product.node.name}
              </CardLink>
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
  return (
    <Layout>
      <section>
        <Container>
          <CategoryHeader>{props.pageContext.cat}</CategoryHeader>
          <Row>
            {allContentfulProducts !== null ? (
              <ProductList products={allContentfulProducts.edges} />
            ) : (
              <h1>No data</h1>
            )}
          </Row>
        </Container>
      </section>
    </Layout>
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
