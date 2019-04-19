import React from "react";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";

const Wrapper = styled.footer`
  background: #84bec9;
  height: 3rem;
`;

export default () => {
  return (
    <Wrapper>
      <Container fluid={true}>
        <Row style={{ paddingTop: "0.75rem" }}>
          <Col>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a
              href="https://www.gatsbyjs.org"
              style={{ textDecoration: "none", color: "white" }}>
              Gatsby
            </a>
          </Col>
          <Col className="text-right">
            <i
              className="fab fa-instagram ml-4 fa-lg"
              style={{ color: "white" }}
            />
            <i
              className="fab fa-facebook-f ml-4 fa-lg"
              style={{ color: "white" }}
            />
            <i
              className="fab fa-twitter-square ml-4 fa-lg"
              style={{ color: "white" }}
            />

            <i
              className="fas fa-envelope ml-4 fa-lg"
              style={{ color: "white" }}
            />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};
