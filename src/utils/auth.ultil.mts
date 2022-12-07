import fs from 'fs';
import path from 'path';
import jsonwebtoken from 'jsonwebtoken';
import jwt from 'express-jwt';


const expiresIn = '60s';
const authConfig = JSON.parse(fs.readFileSync(path.resolve('../config/auth.config.json')).toString());

export function generateAccessToken(username: string) {
	return jsonwebtoken.sign(username, authConfig.TOKEN_SECRET, { expiresIn });
}