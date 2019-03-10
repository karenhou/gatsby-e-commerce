import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown
} from "reactstrap";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";
import { Link } from "@reach/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const cartQuery = gql`
  query {
    cart @client {
      count
    }
  }
`;

const CartComponent = () => {
  // console.log(object)
  return (
    <Query query={cartQuery}>
      {({ data }) => {
        if (data.cart) {
          return (
            <MyNav to="/cart" style={{ textDecoration: "none" }}>
              <i className="fas fa-shopping-cart fa-lg" />
              <span>Cart</span> <span>{data.cart.count}</span>
            </MyNav>
          );
        } else return <div>Still loading</div>;
      }}
    </Query>
  );
};

const MyHeader = styled.header`
  font-family: "Bungee Inline", cursive;
`;

const MyNav = styled(Link)`
  color: #84bec9;
  margin-top: 1em;
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

const Header = ({ siteTitle }) => {
  const [isOpen, set] = useState(true);
  return (
    <MyHeader>
      <Navbar dark expand="md">
        <NavbarBrand style={{ flexGrow: "1" }}>
          <StaticQuery
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
          />
        </NavbarBrand>
        <NavbarToggler
          onClick={() => set(state => !state)}
          aria-label="NavToggler"
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <MyNav to="/" style={{ textDecoration: "none" }}>
                Home
              </MyNav>
            </NavItem>

            <NavItem>
              <MyNav to="/auth" style={{ textDecoration: "none" }}>
                SignUp/Login
              </MyNav>
            </NavItem>
            <NavItem>
              <CartComponent />
            </NavItem>
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
