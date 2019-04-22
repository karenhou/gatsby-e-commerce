import React from "react";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";

const Headings = styled.p`
  color: white;
  text-transform: uppercase;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 3rem;
  transform: translate(-50%, -50%);
`;

const Cards = ({ pix }) => {
  return pix.map(image => (
    <Col
      xs={12}
      sm={12}
      md={6}
      lg={3}
      key={image.node.coverPhoto.id}
      style={{
        backgroundImage: `url(${image.node.coverPhoto.fixed.src})`,
        backgroundSize: "cover",
        width: "100%",
        height: "80vh"
      }}>
      <Headings>
        <a
          href={`/${image.node.name}`}
          style={{
            textDecoration: "none",
            color: "white"
          }}>
          {image.node.name}
        </a>
      </Headings>
    </Col>
  ));
};

export default () => {
  return (
    <Container id="category">
      <Row className="mb-4">
        <h1>Selections</h1>
      </Row>
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
