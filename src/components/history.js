import React from "react";
import { Container, Row, Col } from "reactstrap";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const History = () => {
  return (
    <Container id="intro" className="m-auto">
      <Row style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Col xs={6} style={{ padding: "2rem" }}>
          <StaticQuery
            query={graphql`
              query {
                placeholderImage: file(relativePath: { eq: "candle2.jpg" }) {
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
                  width: "100%",
                  height: "100%"
                }}
              />
            )}
          />
        </Col>
        <Col xs={6} style={{ alignSelf: "center" }}>
          <Container style={{ padding: "2rem 2rem 1rem 2rem" }}>
            <h1>Core Values</h1>
            <h5 style={{ lineHeight: "1.8rem" }}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source.
            </h5>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
export default History;
