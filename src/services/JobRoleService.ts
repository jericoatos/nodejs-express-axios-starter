import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { JobRole } from "../models/JobRole"
import { JobRoleRequest } from "../models/JobRoleRequest";
import { validateJobRoleForm } from "../validators/JobRoleFormValidator";
import { getHeader } from "./AuthUtil";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';
export const URL: string = "/api/job-roles";

interface Params {
    orderBy?: string;
    direction?: string;
}


export const getJobRoles = async (token: string, orderBy?: string, direction?: string): Promise<JobRoleResponse[]> => {
    try {
        const params: Params = {};
        if (orderBy) params.orderBy = orderBy;
        if (direction) params.direction = direction;
        const response: AxiosResponse = await axios.get(URL, {
            headers: getHeader(token).headers,
            params
        });
        return response.data;
    } catch (e) {
        if (e.response?.status === 500) {
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
        throw new Error('failed to get JobRole information');
    }
}

export const createJobRole = async(jobRole: JobRoleRequest, token: string): Promise<number> => {
    
    validateJobRoleForm(jobRole);
    
    try{

        const response: AxiosResponse = await axios.post(URL, jobRole, getHeader(token)); 

        return response.data;
    }catch(e){

        console.log(e);
        throw new Error(e.response.data);
    }
}



