import express from "express"; 
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('job-role-list.html', {jobRole: await getJobRoles()});
}