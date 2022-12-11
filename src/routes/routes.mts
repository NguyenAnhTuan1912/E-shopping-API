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

router.post(`/${authBaseUrl}/login`, checkResquest, login());
router.post(`/${authBaseUrl}/register`, checkResquest, register());
router.post(`/${authBaseUrl}/accesstoken`, checkAccessToken, checkTokenEndPoint('html'));
router.get(apiPathname + `/products`, checkResquest, getAllProducts());

export default router;
