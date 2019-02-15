import React from "react";
import { Container } from "reactstrap";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #84bec9;
`;

export default () => {
  return (
    <Wrapper>
      <Container>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </Container>
    </Wrapper>
  );
};
