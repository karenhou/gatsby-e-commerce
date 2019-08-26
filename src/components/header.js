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

const MyNav = styled(Link)`
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
            <MyNav to="/checkout">
              <i className="fas fa-shopping-cart fa-lg" />
              <span className="ml-2">{data.cart.count || 0}</span>
            </MyNav>
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
      <Navbar
        dark
        expand="md"
        style={{ backgroundColor: "#84bec9", opacity: "0.5" }}>
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
              <MyNav to="/">Home</MyNav>
            </NavItem>
            <NavItem className="my-1">
              <MyNav to="#intro">About</MyNav>
            </NavItem>
            <NavItem className="my-1">
              <MyNav to="#category">Category</MyNav>
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
                <MyNav>
                  <Trans>EN</Trans>
                </MyNav>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => props.onLanChange('cn')}>
                <MyNav>
                  <Trans>中文</Trans>
                </MyNav>
              </NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>
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
