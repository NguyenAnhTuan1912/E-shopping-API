import jsonwebtoken from 'jsonwebtoken';
import authConfig from '../config/auth.config.mjs';
const expiresIn = authConfig.tokenTimeLife;
// class AuthUtils {
// 	private static expiresIn = '60s';
// 	private static pathName = new URL('..', import.meta.url).pathname.slice(1);
// 	// path.join(this.pathName, "config/auth.config.mjs")
// 	public static authConfig: AuthConfig = authConfig;
// 	/**
//     * Get a random access token (has expiration) for user to authorize.
//     * @param {string} user - Pass user's information.
//     **/
// 	public static generateAccessToken(user: UserModel) {
// 		return jsonwebtoken.sign(user, this.authConfig.TOKEN_SECRET, { expiresIn: this.expiresIn });
// 	}
// }
export function generateIDToken(user) {
    try {
        const fullExp = Date.now() + expiresIn * 1000;
        const exp = Math.floor(fullExp / 1000);
        const payload = {
            name: user.username,
            sub: user.id,
            exp,
            fullExp,
        };
        // let token;
        // const check = jsonwebtoken.sign(payload, authConfig.tokenSecret, (error, $token) => {
        // 	token = $token;
        // 	if(error) {
        // 		console.log(error);
        // 		return undefined;
        // 	}
        // });
        // console.log("KASJDGHKASHJD: ", token);
        return jsonwebtoken.sign(payload, authConfig.tokenSecret); // token
    }
    catch (error) {
        return undefined;
    }
}
export function generateAccessToken(scope) {
    try {
        const fullExp = Date.now() + expiresIn * 1000;
        const exp = Math.floor(fullExp / 1000);
        const payload = {
            sub: 'e-shopping-api',
            scope,
            exp,
            fullExp,
        };
        // let token;
        // const check = jsonwebtoken.sign(payload, authConfig.tokenSecret, (error, $token) => {
        // 	token = $token;
        // 	if(error) {
        // 		console.log(error);
        // 		return undefined;
        // 	}
        // });
        // console.log("KASJDGHKASHJD: ", token);
        return jsonwebtoken.sign(payload, authConfig.tokenSecret); // token
    }
    catch (error) {
        return undefined;
    }
}
export function generateCustomToken(userId, data) {
    try {
        const fullExp = Date.now() + expiresIn * 1000;
        const exp = Math.floor(fullExp / 1000);
        const payload = {
            sub: userId,
            exp,
            fullExp,
            ...data
        };
        // let token;
        // const check = jsonwebtoken.sign(payload, authConfig.tokenSecret, (error, $token) => {
        // 	token = $token;
        // 	if(error) {
        // 		console.log(error);
        // 		return undefined;
        // 	}
        // });
        // console.log("KASJDGHKASHJD: ", token);
        return jsonwebtoken.sign(payload, authConfig.tokenSecret); // token
    }
    catch (error) {
        return undefined;
    }
}
export function isEmailValid(email) {
    return email.match(authConfig.emailPattern);
}
export function isUsernameValid(username) {
    return username.match(authConfig.usernamePattern);
}
