import React from "react";
import Auth from "../utils/auth0";
import styled from "styled-components";

const MyNav = styled.a`
  cursor: pointer;
  /* color: #84bec9 !important; */
  color: white !important;
  padding: 0 1em;
  &:hover {
    color: #274547;
  }
  @media only screen and (min-width: 768px) {
    &:hover {
      border-bottom: 4px solid #274547;
    }
  }

  @media only screen and (max-width: 767px) {
    &:hover {
      border-bottom: none;
    }
  }
`;

const auth = new Auth();

const Login = () => {
  const { isAuthenticated } = auth;

  if (isAuthenticated()) {
    return (
      <MyNav style={{ textDecoration: "none" }} onClick={auth.logout}>
        Logout
      </MyNav>
    );
  } else {
    return (
      <MyNav style={{ textDecoration: "none" }} onClick={auth.login}>
        Login
      </MyNav>
    );
  }
};

export default Login;
