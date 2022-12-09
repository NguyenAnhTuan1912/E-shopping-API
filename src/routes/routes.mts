import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { getAllProducts } from '../controllers/v1.0/products.controller.mjs';
import { login, register, checkTokenEndPoint } from '../controllers/auth.controller.mjs';
import apiConfig from '../config/api.config.mjs';
import { checkAccessToken, checkResquest } from '../middlewares/auth.middleware.mjs'

const router = express.Router();
const apiVersion = apiConfig.version; // Optional
const apiBaseUrl = apiConfig.apiBaseUrl;
const authBaseUrl = apiConfig.authBaseUrl;
const apiPathname = `/${apiBaseUrl}/v${apiVersion}`;

router.post(`/${authBaseUrl}/login`, login());
router.post(`/${authBaseUrl}/register`, register());
router.post(`/${authBaseUrl}/accesstoken`, checkAccessToken, checkTokenEndPoint('html'));
router.get(apiPathname + `/products`, getAllProducts());

export default router;
