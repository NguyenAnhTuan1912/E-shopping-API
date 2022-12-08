import express, { Application, Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import jwt from 'express-jwt';
import AuthUtils from '../utils/auth.ultil.mjs';
import bcrypt from 'bcrypt';
import LowDBUltils from '../utils/lowdb.ultil.mjs'

export const login = () => {
	return async function (req: Request, res: Response) {
		try {
			const username = req.body.username;
			const password = req.body.password;
			const user: UserModel | undefined = await LowDBUltils.getUser("username", username);
			let token: string;
			if(user === undefined) {
				res.type("json");
				return res.status(400).send("Your username isn't exist!");
			}
			if(!(await bcrypt.compare(password, user.password))) {
				res.type("json");
				return res.status(400).send("Your password is incorrect!");
			}
			token = AuthUtils.generateAccessToken(user);
			res.type("json");
			return res.send(`Login successfully! Your access token: ${token}`);
		} catch (error) {
			res.type("json");
			return res.status(500).send("Server error");
		}
	};
};

export const register = () => {
	return async function (req: Request, res: Response) {
		try {
			const salt = await bcrypt.genSalt(10);
			const id = Date.now().toString();
			const username: string = req.body.username;
			const bcryptPassword: string = await bcrypt.hash(req.body.password, salt);
			const email: string = req.body.email;
			const altername: string = req.body.altername;

			const newUser = {id, username, password: bcryptPassword, email, altername};

			await LowDBUltils.addUser(newUser);

			res.type("json");
			return res.send(newUser);
		} catch (error) {
			res.type("json");
			return res.status(500).send("Server error");
		}

	};
};