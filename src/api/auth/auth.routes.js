const express = require('express');
const router = express.Router();
const authController = require('./auth.controller.js');

router.get('/register', authController.register());

module.exports = router;
