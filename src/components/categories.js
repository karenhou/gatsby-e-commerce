import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardImgOverlay,
  CardLink
} from "reactstrap";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";

const MyCardImgOverlay = styled(CardImgOverlay)`
  color: white;
  text-align: center;
  position: absolute;
  top: 33% !important;
`;

const MyCardLink = styled(CardLink)`
  color: white;
  font-size: xx-large;
`;

const Cards = ({ pix }) => {
  return pix.map(image => (
    <Col xs={12} md={6} lg={4} key={image.node.coverPhoto.id} className="mb-4">
      <Card inverse>
        <CardImg src={image.node.coverPhoto.fixed.src} alt="Card image cap" />
        <MyCardImgOverlay>
          <MyCardLink
            href={`/${image.node.name}`}
            style={{
              textDecoration: "none"
            }}>
            {image.node.name}
          </MyCardLink>
        </MyCardImgOverlay>
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
