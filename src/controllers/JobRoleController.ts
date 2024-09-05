import express from "express"; 
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('job-role-list', { jobRoles: await getJobRoles(req.session.token) });
    } catch (e) {
        res.locals.errorMessage = e.message;
        res.render('job-role-list');
    }
}
