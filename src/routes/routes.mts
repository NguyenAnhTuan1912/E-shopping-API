import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { getAllProducts } from '../controllers/v1.0/products.controller.mjs';
import { login, register, forgotPassword, changePassword, checkTokenEndPoint } from '../controllers/auth.controller.mjs';
import apiConfig from '../config/api.config.mjs';
import { checkToken, checkResquest } from '../middlewares/auth.middleware.mjs'
import { searchProducts } from '../controllers/v1.0/search.controller.mjs';

const router = express.Router();
const apiVersion = apiConfig.version; // Optional
const apiBaseUrl = apiConfig.apiBaseUrl;
const authBaseUrl = apiConfig.authBaseUrl;
const apiPathname = `/${apiBaseUrl}/v${apiVersion}`;

// Auth
router.post(`/${authBaseUrl}/login`, checkResquest, login());
router.post(`/${authBaseUrl}/register`, checkResquest, register());
router.put(`/${authBaseUrl}/forgot-password`, checkResquest, forgotPassword());
router.put(`/${authBaseUrl}/reset-password`, checkResquest, checkToken(), changePassword());
router.post(`/${authBaseUrl}/accesstoken`, checkResquest, checkToken(), checkTokenEndPoint('html'));

// Products
router.get(apiPathname + '/products', checkResquest, getAllProducts());

// Search (2 queries - name, category)
router.get(apiPathname + '/search', checkResquest, searchProducts())

export default router;
