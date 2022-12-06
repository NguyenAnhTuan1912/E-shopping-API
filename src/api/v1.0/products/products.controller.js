module.exports = {
  getAllProducts: () => {
    return function (req, res) {
      const data = require('../../../../assets/products.json');
      res.type('json');
      console.log(res);
      res.send(data);
    };
  },
};
