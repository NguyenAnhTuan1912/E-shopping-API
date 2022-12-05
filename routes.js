const express = require('express');
const router = express.Router();
const path = require('path');
const config = require('./package.json');
const api = require('./api.js');

const apiVersion = config.version;

router.get('/products', api[apiVersion].getAllProducts());

module.exports = router;
