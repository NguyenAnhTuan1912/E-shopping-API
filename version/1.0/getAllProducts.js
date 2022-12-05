module.exports = function getAllProducts() {
  return function (req, res) {
    const data = require('../../assets/products.json');
    res.type('json');
    res.send(data);
  };
};
