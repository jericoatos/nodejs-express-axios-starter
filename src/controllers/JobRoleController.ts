import express from "express"; 
import { getJobRoleById, getJobRoles } from "../services/JobRoleService";


export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('job-role-list', { jobRoles: await getJobRoles(req.session.token) });
    } catch (e) {
        res.locals.errorMessage = e.message;
        res.render('job-role-list');
    }
}

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        console.log(`Fetching job role with ID: ${id}`);
        const jobRole = await getJobRoleById(req.params.id, req.session.token);
        if (!jobRole) {
            res.status(404).redirect('../error');
            return;
        }
        res.render('job-role-information', { jobRole });
    } catch (e) {
        console.error(e.message);
        res.status(500).redirect('../error');
        return;
    }
}  
export const getErrorMessage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('error');
}