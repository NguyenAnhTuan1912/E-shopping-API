const express = require('express');
const router = express.Router();
const productsController = require('./products.controller.js');

router.get('/products', productsController.getAllProducts());

module.exports = router;
