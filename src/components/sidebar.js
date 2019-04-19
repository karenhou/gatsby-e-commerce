import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const cartQuery = gql`
  query {
    cart @client {
      __typename
      items
      count
    }
  }
`;

const SideBarNav = styled.div`
  padding: 15px 10px;
  background: #fff;
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

const CartIcon = () => {
  return (
    <Query query={cartQuery}>
      {({ loading, error, data }) => {
        if (loading === false) {
          return (
            <a href="/checkout" style={{ textDecoration: "none" }}>
              <i className="fas fa-shopping-cart fa-2x" />
              <span className="ml-2">{data.cart.count || 0}</span>
            </a>
          );
        } else {
          return <h1>loading</h1>;
        }
      }}
    </Query>
  );
};

const CatListNav = ({ data, currentCat }) => {
  return data
    .filter(cat => cat.node.name !== currentCat)
    .map(cat => {
      return (
        <li key={cat.node.id}>
          <a href={cat.node.name}>{cat.node.name}</a>
        </li>
      );
    });
};

const Sidebar = props => {
  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <h3>Category</h3>
      </div>

      <ul className="list-unstyled components">
        {/* <p>{props.cat}</p> */}
        <StaticQuery
          query={graphql`
            query {
              allContentfulProductCategory {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          `}
          render={data => {
            return (
              <CatListNav
                data={data.allContentfulProductCategory.edges}
                currentCat={props.cat}
              />
            );
          }}
        />
        <li className="mt-2 text-center">
          <span>
            <a href="/">
              <i className="fas fa-home fa-2x mx-2" />
            </a>
            <a href="/#intro">
              <i className="fas fa-info-circle fa-2x mx-2" />
            </a>
            <CartIcon />
            {/* <a href="/checkout">
              <i className="fas fa-shopping-cart fa-2x mx-2" />
            </a> */}
          </span>
        </li>
      </ul>
    </nav>
  );
};
export default Sidebar;
