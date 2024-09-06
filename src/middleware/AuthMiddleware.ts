import express from "express";
import { jwtDecode } from "jwt-decode";
import { JwtToken, UserRole } from "../models/JwtToken";
import "core-js/stable/atob";

export const setLoggedInStatus = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.loggedin = !!req.session.token;
    next();
}

export const allowRoles = (allowedRoles: UserRole[]) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (!req.session.token) {
            return res.redirect('/loginErrorMessage');
        }

        const decodedToken: JwtToken = jwtDecode(req.session.token);
        if (!allowedRoles.includes(decodedToken.Role)) {
            return res.status(403).send('User role not authorised for this action');
        }

        next();
    }
}