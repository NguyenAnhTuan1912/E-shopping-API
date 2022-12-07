import express from 'express';
import fs from 'fs';
import path from 'path';
import { getAllProducts } from '../controllers/v1.0/products.controller.mjs';
import { login, register } from '../controllers/auth.controller.mjs';
import apiConfig from '../config/api.config.mjs';


const router = express.Router();
const apiVersion = apiConfig.version; // Optional
const apiBaseUrl = apiConfig.apiBaseUrl;
const authBaseUrl = apiConfig.authBaseUrl;
const apiPathname = `/${apiBaseUrl}/v${apiVersion}`;

router.get(`/${authBaseUrl}/login`, login());
router.post(`/${authBaseUrl}/register`, register());
router.get(apiPathname + `/products`, getAllProducts());

export default router;
