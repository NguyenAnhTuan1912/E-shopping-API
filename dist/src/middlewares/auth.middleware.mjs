import jsonwebtoken from 'jsonwebtoken';
// import {} from '../utils/auth.ultil.mjs';
import authConfig from '../config/auth.config.mjs';
import { Unauthorized, Forbidden, BadRequest } from '@curveball/http-errors';
export function checkToken(opt) {
    return function (req, res, next) {
        try {
            if (req.headers.authorization) {
                console.log(req.headers.authorization);
                const [scheme, token] = req.headers.authorization.split(" ");
                console.log(scheme);
                switch (scheme) {
                    case "Bearer":
                        {
                            const verified = jsonwebtoken.verify(token, authConfig.tokenSecret, (error, decode) => {
                                if (error) {
                                    throw new BadRequest("Invalid token"); // .title = "JSONWebTokenVerifyErrors";;
                                }
                                req.body.decodedData = decode;
                                const scope = req.body.decodedData.scope;
                                const allowScope = opt?.allowedScope;
                                // Check scope
                                if (allowScope && scope) {
                                    if (!scope.includes(allowScope))
                                        throw new Forbidden(`You're not have permission to perform this action.`); // .title = "UnsupportedAuthorizationScheme";
                                }
                            });
                            return next();
                        }
                        ;
                    default: {
                        throw new Forbidden(`${scheme} is not support in this site! :(()`); // .title = "UnsupportedAuthorizationScheme";
                    }
                }
                ;
            }
            else {
                throw new Unauthorized("You must log in first to access this resource!"); // .title = "UnAuthorized";;
            }
        }
        catch (error) {
            const httpStatus = error.httpStatus || 500;
            res.type('json');
            res.status(httpStatus);
            return res.send(error);
        }
    };
}
// Tam thoi se nam o day
export function checkResquest(req, res, next) {
    try {
        const headers = req.headers;
        if (req.method !== "GET") {
            switch (headers['content-type']) {
                case "application/json": {
                    break;
                }
                case "application/x-www-form-urlencoded": {
                    break;
                }
                default: throw new BadRequest("Unsupported content type!");
            }
        }
        console.log("HERE! auth middleware!");
        return next();
    }
    catch (error) {
        const httpStatus = error.httpStatus || 500;
        res.type('json');
        res.status(httpStatus);
        return res.send(error);
    }
}
