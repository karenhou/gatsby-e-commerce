import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";

const MyHeader = styled.header`
  font-family: "Bungee Inline", cursive;
`;

const MyNav = styled.h5`
  color: #84bec9;
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
              <NavLink href="#service">
                <MyNav>Landing</MyNav>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#category">
                <MyNav>Category</MyNav>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/page-2/" style={{ textDecoration: "none" }}>
                  <MyNav>page 2</MyNav>
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <MyNav>SignUp/Login</MyNav>
              </NavLink>
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
