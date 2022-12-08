import express, { Application, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import jsonwebtoken, { decode } from 'jsonwebtoken';
import jwt from 'express-jwt';
import AuthUtils from '../utils/auth.ultil.mjs';
import authConfig from '../config/auth.config.mjs';
import { Unauthorized, Forbidden } from '@curveball/http-errors';

export function checkAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
        if(req.headers.authorization) {
            const [scheme, token] = req.headers.authorization!.split(" ");
            switch(scheme) {
                case "Bearer": {
                    const verified = jsonwebtoken.verify(token, authConfig.TOKEN_SECRET, (error) => {
                        if(error) {
                            const err = new Forbidden("dasd")
                            err.title = "JSONWebTokenVerifyErrors";
                            err.detail = "Invalid token";
                            throw err;
                        }
                    });
                    return next();
                }
                default: {
                    const err = new Forbidden()
                    err.title = "UnsupportedAuthorizationScheme";
                    err.detail = `${scheme} is not support in this site! :(()`;
                    throw err;
                }
            };
        } else {
            const err = new Unauthorized("asjkdhkajshdkajshd")
            err.title = "UnAuthorized";
            err.detail = "You must log in first to access this resource!";
            throw err;
        }
    } catch (error: any) {
        return res.send(error);
    }
}