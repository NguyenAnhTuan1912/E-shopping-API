const express = require('express');
const router = express.Router();
const productsController_v1_0 = require('../controllers/v1.0/products.controller.js');
const authController = require('../auth/auth.controller.js');
const apiConfig = require('../config/api.config.js');
const apiVersion = apiConfig.version; // Optional
const apiBaseUrl = apiConfig.apiBaseUrl;
const authBaseUrl = apiConfig.authBaseUrl;
const apiPathname = `/${apiBaseUrl}/v${apiVersion}`;

router.post(`/${authBaseUrl}/register`, authController.register());
router.get(apiPathname + `/products`, productsController_v1_0.getAllProducts());

module.exports = router;
