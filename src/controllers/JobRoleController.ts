import express from "express"; 
import * as JobRoleService from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const jobRoles = await JobRoleService.getJobRoles();
        res.render('job-role-list', { jobRoles });
    } catch (e) {
        res.locals.errorMessage = e.message;
        res.render('job-role-list');
    }
}
