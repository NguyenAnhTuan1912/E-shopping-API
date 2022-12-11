import { Request, Response } from 'express';
// import jsonwebtoken from 'jsonwebtoken';
// import jwt from 'express-jwt';
import bcrypt from 'bcrypt';
import { generateAccessToken, isEmailValid, isUsernameValid } from '../utils/auth.ultil.mjs';
import { getUser, isUserExist, addUser } from '../utils/lowdb.ultil.mjs'
import { BadRequest, InternalServerError } from '@curveball/http-errors';

export const checkTokenEndPoint = (responseType: string) => {
    return function(req: Request, res: Response) {
        const decodedData: JWTPayloadModel = req.body.decodedData;
		if(responseType === 'json') {
			res.type(responseType);
			return res.send(decodedData);
		}
		if(responseType === 'html') {
			const html = `
				<p><strong>User's id: </strong><span style="color: red">${decodedData.sub}</span></p>
				<p><strong>User's name: </strong><span style="color: red">${decodedData.name}</span></p>
				<p><strong>This to token will expire in: </strong><span style="color: red">${new Date(decodedData.fullExp).toLocaleTimeString()}</span></p>
				<p><strong>This to token will expire in (Full): </strong><span style="color: red">${new Date(decodedData.fullExp)}</span></p>
			`;
			res.type(responseType);
			return res.send(html);
		}
    }
}

export const login = () => {
	return async function (req: Request, res: Response) {
		try {
			console.log(req.body);
			console.log(typeof req.body);
			const username = req.body.username;
			const password = req.body.password;
			const user: UserModel | undefined = await getUser("username", username);
			let token: string | undefined;
			if(user === undefined) {
				res.type("json");
				throw new BadRequest("Your username isn't exist!")// .title = "UserForAuthenticationNotFound";
			}
			if(!(await bcrypt.compare(password, user.password))) {
				res.type("json");
				throw new BadRequest("Your password is incorrect!")// .title = "UserForAuthenticationNotFound";
			}
			token = generateAccessToken(user);
			if(!token) {
				throw new InternalServerError("Cannot create token");
			}
			res.type("json");
			return res.send({
				status: "Login successfully!",
				token
			});
		} catch (error: any) {
			res.type("json");
			res.status(error.httpStatus);
			return res.send(error);
		}
	};
};

export const register = () => {
	return async function (req: Request, res: Response) {
		try {
			const username: string = req.body.username;
			const email: string = req.body.email;
			const altername: string = req.body.altername;
			if(await isUserExist("username", req.body.username)) {
				throw new BadRequest("Your username already exist!")// .title = "UserForAuthenticationIsDuplicated";
			}
			if(await isUserExist("email", req.body.email)) {
				throw new BadRequest("Your email already exist!")// .title = "UserForAuthenticationIdDuplicated";
			}
			if(!isUsernameValid(username)) {
				throw new BadRequest("Your username is invalid");
			}
			if(!isEmailValid(email)) {
				throw new BadRequest("Your username is invalid");
			}
			const newUser = {
				id: Date.now().toString(),
				username,
				password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)),
				email,
				altername
			};
			if(!(await addUser(newUser))) {
				throw new InternalServerError("Cannot add your information!")// .title = "FailedToCreateNewRecord";
			}
			res.type("json");
			return res.send(newUser);
		} catch (error: any) {
			res.type("json");
			res.status(error.httpStatus);
			return res.send(error);
		}
	};
};

export function forgotPassword(req: Request, res: Response) {
	try {

	} catch (error: any) {
		res.type("json");
		res.status(error.httpStatus);
		return res.send(error);
	}
}

export function changePassword(req: Request, res: Response) {
	try {

	} catch (error: any) {
		res.type("json");
		res.status(error.httpStatus);
		return res.send(error);
	}
}