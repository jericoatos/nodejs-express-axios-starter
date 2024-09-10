import express from "express"; 
import * as JobRoleService from "../services/JobRoleService";
import { createJobRole } from "../services/JobRoleService";


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

export const getJobRoleForm = async (req:express.Request, res:express.Response): Promise<void> => {
    res.render('job-role-form.html');
}
export const postJobRoleForm = async(req: express.Request, res: express.Response): Promise<void> => {
    try{
        const id = await createJobRole(req.body);
        res.redirect('/job-roles/'+ id); //changed from regular id, jobroles
    }catch(error) {
    //console.error("Error creating job role:", error);
       res.locals.errormessage = error.message;
       res.render('job-role-form.html', req.body);
        
    }
}

