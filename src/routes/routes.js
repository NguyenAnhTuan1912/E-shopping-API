const auth = require('../api/auth/auth.routes.js');
const products_v1_0 = require('../api/v1.0/products/products.routes.js');

module.exports = {
  auth: auth,
  'v1.0': [products_v1_0],
};
