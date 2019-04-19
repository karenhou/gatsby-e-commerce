import React from "react";
import { Container, Row, Col, Jumbotron } from "reactstrap";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Introduction = () => {
  return (
    // <Container fluid={true} id="intro" style={{ height: "100vh" }}>
    <Container id="intro" style={{ height: "100vh" }}>
      <Row>
        <Col xs={8}>
          <Container style={{ padding: "1rem 2rem 1rem 2rem" }}>
            <h1>Introduction</h1>
            <h3>
              Where does it come from? Contrary to popular belief, Lorem Ipsum
              is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur
            </h3>
          </Container>
        </Col>
        <Col xs={4}>
          <StaticQuery
            query={graphql`
              query {
                placeholderImage: file(relativePath: { eq: "candle1.jpg" }) {
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
        </Col>
      </Row>
    </Container>
  );
};
export default Introduction;
