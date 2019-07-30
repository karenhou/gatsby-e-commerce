import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";
import { Container, Row, Col } from "reactstrap";

const MyContainer = styled.section`
  font-family: "Lobster", cursive;
`;

const Headings = styled.h1`
  color: white;
  text-transform: uppercase;
  margin: 0;
  position: absolute;
  top: 45%;
  left: 60%;
  font-size: 8.5rem;
  transform: translate(-50%, -50%);

  @media all and (max-width: 991px) {
    font-size: 7rem;
    left: 50%;
    text-align: left;
  }

  @media all and (max-width: 768px) {
    font-size: 6rem;
    left: 50%;
    text-align: left;
  }
  @media all and (max-width: 575px) {
    font-size: 4rem;
    left: 50%;
    text-align: left;
  }
`;

const Subtitles = styled.h3`
  color: white;
  margin: 0;
  position: absolute;
  top: 83%;
  left: 45%;
  font-size: 2rem;
  transform: translate(0, -50%);

  @media all and (max-width: 1199px) {
    top: 87%;
    right: 1%;
  }

  @media all and (max-width: 991px) {
    text-align: left;
    top: 80%;
    left: 18%;
  }

  @media all and (max-width: 768px) {
    font-size: 1.6rem;
    top: 75%;
    left: 18%;
    text-align: center;
  }
  @media all and (max-width: 575px) {
    font-size: 1.2rem;
    top: 70%;
    left: 18%;
    text-align: center;
  }
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
              width: "100%",
              height: "100vh"
            }}
          />
        )}
      />

      <Container>
        <Row style={{ height: "100vh" }}>
          <Col xs={12} className="text-right">
            <Headings>Uncented Candles</Headings>
            <Subtitles>when dedication meet delicate hand craft</Subtitles>
          </Col>
        </Row>
      </Container>
    </MyContainer>
  );
};

export default Landing;
