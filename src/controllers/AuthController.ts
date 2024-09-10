import { getAuthToken } from '../services/AuthService';
import express from 'express';

// Renamed function to follow camel case consistently
export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('loginForm');
};

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        // Ensure req.body is properly typed
        req.session.token = await getAuthToken(req.body);
        res.redirect('/');
    } catch (error) {
        // Improved error handling
        res.locals.errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error details:', error instanceof Error ? error.message : error);
        res.render('loginForm', req.body);
    }
};

export const logout = async (req: express.Request, res: express.Response): Promise<void> => {
    req.session.token = undefined;
    res.redirect('/loginForm');
};

// Renamed function to follow camel case consistently
export const getLoginErrorMessage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('loginErrorMessage');
};
