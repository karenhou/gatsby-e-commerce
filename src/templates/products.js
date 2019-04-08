import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import CartBtn from "../components/cartBtn";
import {
  Card,
  CardImg,
  Col,
  Row,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  CardLink
} from "reactstrap";

const ProductList = ({ products }) => {
  return products.map(product => {
    return (
      <Col xs={12} md={6} lg={4} key={product.node.contentful_id}>
        <Card>
          <CardImg
            top
            width="100%"
            src={product.node.photos[0].file.url}
            alt={product.node.photos[0].title}
          />
          <CardBody>
            <CardTitle>{product.node.name}</CardTitle>
            <CardSubtitle>${product.node.price}</CardSubtitle>
            {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}

            <Button>
              <CardLink
                href={`/${product.node.category.name}/${
                  product.node.contentful_id
                }`}
                style={{ textDecoration: "none", color: "white" }}>
                Detail
              </CardLink>
            </Button>
            <CartBtn product={product} />
          </CardBody>
        </Card>
      </Col>
    );
  });
};

export default props => {
  const { allContentfulProducts } = props.data;
  return (
    <Layout>
      <Container>
        <h1 style={{ textAlign: "center" }}>{props.pageContext.cat}</h1>
        <Row>
          {allContentfulProducts !== null ? (
            <ProductList products={allContentfulProducts.edges} />
          ) : (
            <h1>No data</h1>
          )}
        </Row>
      </Container>
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
