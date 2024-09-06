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



export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params; 
        console.log(`Fetching job role with ID: ${id}`);
        const jobRole = await JobRoleService.getJobRoleById(id);
        if (!jobRole) {
            res.status(404).send('Job role not found');
            return;
        }
        res.render('job-role-information', { jobRole });
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Error retrieving job role');
    }
}  