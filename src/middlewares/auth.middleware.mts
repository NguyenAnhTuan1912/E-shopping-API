import { Request, Response, NextFunction } from 'express';
import jsonwebtoken, { decode } from 'jsonwebtoken';
// import {} from '../utils/auth.ultil.mjs';
import authConfig from '../config/auth.config.mjs';
import { Unauthorized, Forbidden, BadRequest } from '@curveball/http-errors';

export function checkAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
        if(req.headers.authorization) {
            const [scheme, token] = req.headers.authorization!.split(" ");
            switch(scheme) {
                case "Bearer": {
                    const verified = jsonwebtoken.verify(token, authConfig.tokenSecret, (error, decode) => {
                        if(error) {
                            throw new BadRequest("Invalid token")// .title = "JSONWebTokenVerifyErrors";;
                        }
                        req.body.decodedData = decode;
                    });
                    return next();
                }
                default: {
                    throw new Forbidden(`${scheme} is not support in this site! :(()`)// .title = "UnsupportedAuthorizationScheme";
                }
            };
        } else {
            throw new Unauthorized("You must log in first to access this resource!")// .title = "UnAuthorized";;
        }
    } catch (error: any) {
        res.type('json');
        res.status(error.httpStatus);
        return res.send(error);
    }
}

// Tam thoi se nam o day
export function checkResquest(req: Request, res: Response, next: NextFunction) {
    try {
        const headers = req.headers;
        const body = req.body;
        console.log(req.method);
        if(req.method !== "GET") {
            switch(headers['content-type']) {
                case "application/json": {
                    break;
                }
                case "application/x-www-form-urlencoded": {
                    break;
                }
                default: throw new BadRequest("Unsupported content type!");
            }
            if(typeof body !== 'string') {
                throw new BadRequest("You must stringify your data object before request!");
            }
        }
        return next();
    } catch (error: any) {
        res.type('json');
        res.status(error.httpStatus);
        return res.send(error);
    }
}