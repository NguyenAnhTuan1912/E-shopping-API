import express, { Application, Request, Response, NextFunction } from 'express';
import db from '../../utils/db.ultil.mjs';


export const getAllProducts = () => {
	return function (req: Request, res: Response) {
		const data = db.get("products").value();
		res.type('json');
		res.send(data);
	};
};
