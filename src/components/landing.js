import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";
import { Container, Row, Col } from "reactstrap";
import Header from "../components/header";

const MyContainer = styled.section`
  font-family: "Lobster", cursive;
`;

const Landing = () => {
  return (
    <MyContainer id="home">
      <StaticQuery
        query={graphql`
          query {
            placeholderImage: file(relativePath: { eq: "landing.jpg" }) {
              childImageSharp {
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        `}
        render={data => (
          <Img
            fluid={data.placeholderImage.childImageSharp.fluid}
            style={{
              backgroundSize: "cover",
              position: "absolute",
              // left: 0,
              // top: 0,
              width: "100%",
              height: "100vh"
            }}
          />
        )}
      />

      <Container>
        {/* <Header /> */}
        <Row style={{ height: "100vh" }}>
          <Col xs={12} className="text-center">
            {/* <h1 style={{ color: "#367d8a" }}>Landing</h1> */}
          </Col>
        </Row>
      </Container>
    </MyContainer>
  );
};

export default Landing;
