import express from "express"; 
import { getJobRoleById, getJobRoles } from "../services/JobRoleService";


export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    const orderBy = req.query.orderBy as string;
    const direction = req.query.direction as string;
    try {
        const jobRoles = await getJobRoles(req.session.token, orderBy, direction);
        res.render('job-role-list', { jobRoles, orderBy, direction });
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('job-role-list', { jobRoles: [], orderBy, direction });
    }
};

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