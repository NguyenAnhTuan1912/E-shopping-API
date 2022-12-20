import { v4 as uuidv4 } from 'uuid';
// import jsonwebtoken from 'jsonwebtoken';
// import jwt from 'express-jwt';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateIDToken, generateCustomToken, isEmailValid, isUsernameValid } from '../utils/auth.ultil.mjs';
import { getUser, isUserExist, addUser, updateUser } from '../utils/lowdb.ultil.mjs';
import { BadRequest, InternalServerError } from '@curveball/http-errors';
export const checkTokenEndPoint = (responseType) => {
    return function (req, res) {
        const decodedData = req.body.decodedData;
        if (responseType === 'json') {
            res.type(responseType);
            return res.send(decodedData);
        }
        if (responseType === 'html') {
            const html = `
				<p><strong>User's id: </strong><span style="color: red">${decodedData.sub}</span></p>
				<p><strong>User's name: </strong><span style="color: red">${decodedData.name}</span></p>
				<p><strong>This to token will expire in: </strong><span style="color: red">${new Date(decodedData.fullExp).toLocaleTimeString()}</span></p>
				<p><strong>This to token will expire in (Full): </strong><span style="color: red">${new Date(decodedData.fullExp)}</span></p>
			`;
            res.type(responseType);
            return res.send(html);
        }
    };
};
export const login = () => {
    return async function (req, res) {
        try {
            const body = req.body;
            const username = body.username;
            const password = body.password;
            const user = await getUser("username", username);
            let id_token;
            let access_token;
            if (user === undefined) {
                res.type("json");
                throw new BadRequest("Your username is incorrect!. Please, try again."); // .title = "UserForAuthenticationNotFound";
            }
            if (!(await bcrypt.compare(password, user.password))) {
                res.type("json");
                throw new BadRequest("Your password is incorrect!. Please, try again."); // .title = "UserForAuthenticationNotFound";
            }
            id_token = generateIDToken(user);
            access_token = generateAccessToken('read write');
            if (!id_token || !access_token) {
                throw new InternalServerError("Cannot create token");
            }
            res.type("json");
            return res.send({
                status: 1,
                isSuccessful: true,
                detail: "Login successfully!",
                id_token,
                access_token
            });
        }
        catch (error) {
            const httpStatus = error.httpStatus || 500;
            res.type("json");
            console.log("Login Http status error: ", httpStatus);
            res.status(httpStatus);
            return res.send(error);
        }
    };
};
export const register = () => {
    return async function (req, res) {
        try {
            const body = req.body;
            const username = body.username;
            const password = body.password;
            const confirmPassword = body.confirmPassword;
            const email = body.email;
            const altername = body.altername;
            console.log(req.body);
            if (!isUsernameValid(username)) {
                throw new BadRequest("Your username is invalid.");
            }
            if (!isEmailValid(email)) {
                throw new BadRequest("Your email is invalid.");
            }
            if (await isUserExist("username", username)) {
                throw new BadRequest("Your username already exist!"); // .title = "UserForAuthenticationIsDuplicated";
            }
            if (await isUserExist("email", email)) {
                throw new BadRequest("Your email already exist!"); // .title = "UserForAuthenticationIdDuplicated";
            }
            if (password !== confirmPassword) {
                throw new BadRequest("Failed to confirm password.");
            }
            const newUser = {
                id: uuidv4(),
                username,
                password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
                email,
                altername
            };
            if (!(await addUser(newUser))) {
                throw new InternalServerError("Cannot add your information!"); // .title = "FailedToCreateNewRecord";
            }
            res.type("json");
            return res.send(newUser);
        }
        catch (error) {
            const httpStatus = error.httpStatus || 500;
            res.type("json");
            res.status(httpStatus);
            return res.send(error);
        }
    };
};
export const forgotPassword = () => {
    return async function (req, res) {
        try {
            const email = req.body.email;
            console.log(email);
            // const origin = req.body.origin as string;
            let user;
            let recover_token;
            // let reset_password_token;
            if (!isEmailValid(email)) {
                throw new BadRequest("Your email is invalid.");
            }
            user = await getUser("email", email);
            if (!user) {
                throw new BadRequest("Your email doesn't exist!"); // .title = "UserForAuthenticationIdDuplicated";
            }
            // reset_password_token = generateAccessToken("update");
            // if(!reset_password_token) {
            // 	throw new InternalServerError("Cannot create token");
            // }
            recover_token = generateCustomToken(user.id, { email });
            if (!recover_token) {
                throw new InternalServerError("Cannot create token");
            }
            console.log("RUN HERE?");
            return res.send({
                status: 1,
                isSuccessful: true,
                detail: "Email check successfully!",
                recover_token
            });
        }
        catch (error) {
            const httpStatus = error.httpStatus || 500;
            res.type("json");
            res.status(httpStatus);
            return res.send(error);
        }
    };
};
export const changePassword = () => {
    return async function (req, res) {
        try {
            const body = req.body;
            const password = body.password;
            const confirmPassword = body.confirmPassword;
            const userId = req.body.decodedData.sub;
            if (password !== confirmPassword) {
                throw new BadRequest("Failed to confirm password.");
            }
            const newPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
            console.log(userId);
            console.log(newPassword);
            const update = await updateUser(userId, "password", newPassword);
            console.log(update);
            if (!update) {
                throw new InternalServerError("Cannot change your password");
            }
            res.type("json");
            console.log("IS PASSWORD CHANGE?");
            return res.send({
                status: 1,
                isSuccessful: true,
                detail: "Change password successfully!"
            });
        }
        catch (error) {
            const httpStatus = error.httpStatus || 500;
            console.log("HAS ERROR AFTER SEND RES?");
            res.type("json");
            res.status(httpStatus);
            return res.send(error);
        }
    };
};
