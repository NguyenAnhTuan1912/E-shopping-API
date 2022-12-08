import express from 'express';
import fs from 'fs';
import path from 'path';
import { getAllProducts } from '../controllers/v1.0/products.controller.mjs';
import { login, register } from '../controllers/auth.controller.mjs';
import apiConfig from '../config/api.config.mjs';
import { checkAccessToken } from '../middlewares/auth.middleware.mjs'

const router = express.Router();
const apiVersion = apiConfig.version; // Optional
const apiBaseUrl = apiConfig.apiBaseUrl;
const authBaseUrl = apiConfig.authBaseUrl;
const apiPathname = `/${apiBaseUrl}/v${apiVersion}`;

router.post(`/${authBaseUrl}/login`, login());
router.post(`/${authBaseUrl}/register`, register());
router.get(apiPathname + `/products`, checkAccessToken, getAllProducts());

export default router;
