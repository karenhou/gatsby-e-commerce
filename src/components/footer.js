import React from "react";
import { Container, Row } from "reactstrap";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #84bec9;
  height: 3rem;
`;

export default () => {
  return (
    <Wrapper>
      <Container>
        <Row>
          <footer style={{ marginTop: "0.75rem" }}>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </Row>
      </Container>
    </Wrapper>
  );
};
