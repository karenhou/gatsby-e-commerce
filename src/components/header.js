import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  Spinner
} from "reactstrap";
import styled from "styled-components";
import { Link } from "@reach/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
// import Login from "./login";

const cartQuery = gql`
  query {
    cart @client {
      __typename
      items
      count
    }
  }
`;

const MyHeader = styled.header`
  font-family: "Bungee Inline", cursive;
`;

const MyNavbar = styled(Navbar)`
  background-color: #84bec9;
  opacity: 0.5;
`;

const MyNavItem = styled(Link)`
  color: white;
  margin-top: 1em;
  padding: 0 1em;
  text-decoration: none;
  &:hover {
    color: #274547;
  }
  @media only screen and (min-width: 768px) {
    &:hover {
      border-bottom: 4px solid #274547;
    }
  }
`;

const CartComponent = () => {
  return (
    <Query query={cartQuery}>
      {({ loading, error, data }) => {
        if (loading === false) {
          return (
            <MyNavItem to="/checkout">
              <i className="fas fa-shopping-cart fa-lg" />
              <span className="ml-2">{data.cart.count || 0}</span>
            </MyNavItem>
          );
        } else {
          return <Spinner color="primary" />;
        }
      }}
    </Query>
  );
};

const Header = ({ siteTitle }) => {
  const [isOpen, set] = useState(true);
  return (
    <MyHeader>
      <MyNavbar expand="md">
        <NavbarBrand style={{ flexGrow: "1" }}>
          <h5>Logo</h5>
          {/* <StaticQuery
            query={graphql`
              query {
                placeholderImage: file(
                  relativePath: { eq: "gatsby-icon.png" }
                ) {
                  childImageSharp {
                    fixed(width: 60) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
              }
            `}
            render={data => (
              <Img fixed={data.placeholderImage.childImageSharp.fixed} />
            )}
          /> */}
        </NavbarBrand>
        <NavbarToggler
          onClick={() => set(state => !state)}
          aria-label="NavToggler"
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="my-1">
              <MyNavItem to="/">Home</MyNavItem>
            </NavItem>
            <NavItem className="my-1">
              <MyNavItem to="#intro">About</MyNavItem>
            </NavItem>
            <NavItem className="my-1">
              <MyNavItem to="#category">Category</MyNavItem>
            </NavItem>
            <NavItem className="my-1">
              <CartComponent />
            </NavItem>
            {/* <NavItem>
              <Login />
            </NavItem> */}
            <UncontrolledDropdown nav inNavbar />
            {/* <NavItem>
              <NavLink onClick={() => props.onLanChange('en')}>
                <MyNavItem>
                  <Trans>EN</Trans>
                </MyNavItem>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => props.onLanChange('cn')}>
                <MyNavItem>
                  <Trans>中文</Trans>
                </MyNavItem>
              </NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>
      </MyNavbar>
    </MyHeader>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
