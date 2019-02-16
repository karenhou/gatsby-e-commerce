import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardImg,
  CardImgOverlay,
  CardLink
} from "reactstrap";
import { StaticQuery, graphql } from "gatsby";

const Cards = ({ pix }) => {
  return pix.map(image => (
    <Col xs={12} md={6} lg={4} key={image.node.coverPhoto.id}>
      <Card inverse>
        <CardImg src={image.node.coverPhoto.fixed.src} alt="Card image cap" />
        <CardImgOverlay className="m-auto">
          <CardTitle>{image.node.name}</CardTitle>
          <CardLink
            href={`/${image.node.name}`}
            style={{ textDecoration: "none", color: "white" }}>
            Detail
          </CardLink>
        </CardImgOverlay>
      </Card>
    </Col>
  ));
};

export default () => {
  return (
    <Container id="category" className="mb-3">
      <h1 className="text-center">Category</h1>
      <Row>
        <StaticQuery
          query={graphql`
            query {
              allContentfulProductCategory {
                edges {
                  node {
                    name
                    coverPhoto {
                      id
                      title
                      fixed {
                        src
                      }
                    }
                  }
                }
              }
            }
          `}
          render={data => (
            <Cards pix={data.allContentfulProductCategory.edges} />
          )}
        />
      </Row>
    </Container>
  );
};
