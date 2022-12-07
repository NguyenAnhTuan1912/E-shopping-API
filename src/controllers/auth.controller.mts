import express, { Application, Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import jwt from 'express-jwt';
import { generateAccessToken } from '../utils/auth.ultil.mjs';
import bcrypt from 'bcrypt';

export const login = () => {
	return function (req: Request, res: Response) {
		console.log(req.body);
		const username = req.body.username;
		const password = req.body.password;

		if(username !== 'tuna') res.status(400).send("Your username is incorrect!");
		if(password !== 'anhtuan19') res.status(400).send("Your password is incorrect!");

		res.send("Login successfully!");
	};
};

export const register = () => {
	return function (req: Request, res: Response) {
		const username = req.query.username;
		res.type('json');
		res.send(`Register done! Hello ${username}`);
	};
};