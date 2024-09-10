import { getAuthToken } from '../services/AuthService';
import express from "express";

export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('loginForm');
}

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        req.session.token = await getAuthToken(req.body);
        res.redirect('/');
    } catch (error) {
        res.locals.errormessage = error.message;
        console.log("Error details:", JSON.stringify(error.message));
        res.render('loginForm', req.body);
    }
}

export const logout = async(req: express.Request, res: express.Response): Promise<void> => {
    req.session.token = undefined;
    res.redirect('/loginForm');
}

export const getloginErrorMessage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('loginErrorMessage');
}

export const getNonAuthorizedMessage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('nonAuthorizedError');
}
