import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import {
  Col,
  Row,
  Container,
  Button,
  Card,
  CardTitle,
  CardText,
  CardImg,
  CardSubtitle
} from "reactstrap";

export default props => {
  console.log("details ", props);
  const { contentfulProducts } = props.data;
  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <Card>
              <CardImg
                top
                width="100%"
                src={contentfulProducts.photos[0].file.url}
                alt={contentfulProducts.photos[0].title}
              />
            </Card>
          </Col>

          <Col>
            <Card style={{ height: "100%" }}>
              <CardTitle>{contentfulProducts.name}</CardTitle>
              <CardSubtitle>$ {contentfulProducts.price}</CardSubtitle>
              <CardText>{contentfulProducts.inventory}</CardText>
              <Button>Check out</Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query findItem($item_id: String!) {
    contentfulProducts(id: { eq: $item_id }) {
      id
      name
      price
      inventory
      photos {
        file {
          url
          fileName
        }
      }
    }
  }
`;
