import React from "react";
import { StaticQuery, graphql } from "gatsby";
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
          <a href={cat.node.name} style={{ width: "100%" }}>
            {cat.node.name}
          </a>
        </li>
      );
    });
};

const Sidebar = props => {
  return (
    <nav id="sidebar" className={props.collapsed ? "active" : ""}>
      <div className="sidebar-header">
        <h3>Category</h3>
      </div>
      <ul className="list-unstyled components">
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
          </span>
        </li>
      </ul>
    </nav>
  );
};
export default Sidebar;
