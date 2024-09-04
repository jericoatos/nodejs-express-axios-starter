import express from "express";

export const setLoggedInStatus = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.loggedin = !!req.session.token;
    next();
}