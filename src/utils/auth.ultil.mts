import fs from 'fs';
import path from 'path';
import jsonwebtoken from 'jsonwebtoken';
import jwt from 'express-jwt';
import authConfig from '../config/auth.config.mjs';


const expiresIn = '60s';

type AuthConfig = {
	TOKEN_SECRET: string;
}

class AuthUtils {
	private static expiresIn = '60s';
	private static pathName = new URL('..', import.meta.url).pathname.slice(1);
	// path.join(this.pathName, "config/auth.config.mjs")
	public static authConfig: AuthConfig = authConfig;

	/**
    * Get a random access token (has expiration) for user to authorize.
    * @param {string} user - Pass user's information.
    **/
	public static generateAccessToken(user: UserModel) {
		return jsonwebtoken.sign(user, this.authConfig.TOKEN_SECRET, { expiresIn: this.expiresIn });
	}
}

export default AuthUtils;