import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import CartBtn from "../components/btns/cartBtn";
import { Container } from "reactstrap";

export default props => {
  const node = props.data.contentfulProducts;
  const edge = { node }; //wrapper so the object would be same when passing to cartBtn
  return (
    <Layout>
      <Container style={{ padding: "3rem" }}>
        <div className="card mb-3">
          <div className="row no-gutters">
            <div
              className="col-md-8"
              style={{ borderRight: "1px solid rgba(0,0,0,.125)" }}>
              <img
                id="product-img"
                src={node.photos[0].file.url}
                className="card-img"
                alt={node.photos[0].title}
              />
            </div>
            <div className="col-md-4">
              <div className="card-body d-flex flex-column h-100 ">
                <h5 className="card-title">{node.name}</h5>
                <p className="card-text">$ {node.price}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Inventory: {node.inventory}
                  </small>
                </p>
                <div className="mt-auto">
                  <CartBtn product={edge} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query findItem($item_id: String!) {
    contentfulProducts(contentful_id: { eq: $item_id }) {
      contentful_id
      name
      price
      inventory
      photos {
        file {
          url
          fileName
        }
      }
      category {
        name
      }
    }
  }
`;
