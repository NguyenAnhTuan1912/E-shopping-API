import express, { Application, Request, Response, NextFunction } from 'express';
import LowDBUltils from '../../utils/lowdb.ultil.mjs';


export const getAllProducts = () => {
	return async function (req: Request, res: Response) {
		const data = await LowDBUltils.getRecords<ProductModel>("products");
		res.type('json');
		return res.send(data);
	};
};
