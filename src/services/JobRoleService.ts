import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { JobRole } from "../models/JobRole"
import { JobRoleRequest } from "../models/JobRoleRequest";
import { validateJobRoleForm } from "../validators/JobRoleFormValidator";
import { getHeader } from "./AuthUtil";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';
export const URL: string = "/api/job-roles";


export const getJobRoles = async (token: string): Promise<JobRoleResponse[]> => {
    try{
        const response: AxiosResponse = await axios.get(URL, getHeader(token));
        return response.data;
    } catch (e){
        if(e.response?.status === 500){
            throw new Error("Failed to get job roles");
        }
        throw new Error(e.message);
    }
} 

export const getJobRoleById = async (id: string, token: string): Promise<JobRole> => {
    try {
        const response: AxiosResponse = await axios.get(`${URL}/${id}`, getHeader(token));
        
        return response.data;
    } catch(e){
        console.log(e);
        throw new Error('failed to get JobRole information');
    }
}

export const createJobRole = async(jobRole: JobRoleRequest): Promise<Number> => {
    console.log('Megan 0');
    validateJobRoleForm(jobRole);
    console.log('Megan 1');
    try{
        console.log('Megan 2');

        const response: AxiosResponse = await axios.post('http://localhost:8080/api/job-roles', jobRole);
        console.log('Megan 3');

        return response.data;
    }catch(e){
        console.log('Megan 4');

        console.log(e);
        throw new Error(e.response.data);
    }
}

