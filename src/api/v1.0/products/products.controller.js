module.exports = {
  getAllProducts: () => {
    return function (req, res) {
      const data = require('../../../../assets/products.json');
      console.log(data);
      res.type('json');
      res.send(data);
    };
  },
};
