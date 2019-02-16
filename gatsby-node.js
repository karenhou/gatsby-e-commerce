const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const productPage = path.resolve("./src/templates/products.js");
    const detailProduct = path.resolve("./src/templates/detailProduct.js");
    resolve(
      graphql(
        `
          {
            allContentfulProductCategory {
              edges {
                node {
                  name
                }
              }
            }

            allContentfulProducts {
              edges {
                node {
                  category {
                    name
                  }
                  id
                  name
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }
        const productsAll = result.data.allContentfulProducts.edges;
        productsAll.forEach((product, index) => {
          createPage({
            path: `/${product.node.category.name}/${product.node.id}`,
            component: detailProduct,
            context: {
              item_id: product.node.id
            }
          });
        });

        const productsByCat = result.data.allContentfulProductCategory.edges;
        productsByCat.forEach((product, index) => {
          createPage({
            path: `/${product.node.name}/`,
            component: productPage,
            context: {
              cat: product.node.name
            }
          });
        });
      })
    );
  });
};
