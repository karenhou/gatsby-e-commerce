const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const productPage = path.resolve("./src/templates/products.js");
  const detailProduct = path.resolve("./src/templates/detailProduct.js");
  const result = await graphql(`
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
            contentful_id
            name
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  const productsAll = result.data.allContentfulProducts.edges;
  productsAll.forEach((product, index) => {
    createPage({
      path: `/${product.node.category.name}/${product.node.contentful_id}`,
      component: detailProduct,
      context: {
        item_id: product.node.contentful_id
      }
    });
  });

  const productsByCat = result.data.allContentfulProductCategory.edges;
  productsByCat.forEach(product => {
    createPage({
      path: `/${product.node.name}/`,
      component: productPage,
      context: {
        cat: product.node.name
      }
    });
  });
};
