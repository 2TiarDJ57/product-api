const {
  addProductHandler,
  getAllProductsHandler,
  getDetailProductHandler,
  editDetailProductsHandler,
  deleteDetailProductHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/products',
    handler: addProductHandler,
  },

  {
    method: 'GET',
    path: '/products',
    handler: getAllProductsHandler,
  },

  {
    method: 'GET',
    path: '/products/{productId}',
    handler: getDetailProductHandler,
  },

  {
    method: 'PUT',
    path: '/products/{productId}',
    handler: editDetailProductsHandler,
  },

  {
    method: 'DELETE',
    path: '/products/{productId}',
    handler: deleteDetailProductHandler,
  },
];

module.exports = routes;
