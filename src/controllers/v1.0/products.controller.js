const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
// import lowdb from 'lowdb;';
const path = require('path');
const productsFilePath = path.resolve('./assets/db/products.json');
const productsFile = require(productsFilePath);

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
/*
  Error [ERR_REQUIRE_ESM]: require() of ES Module ... from ... not supported
*/
