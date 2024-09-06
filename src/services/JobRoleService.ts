import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { JobRole } from "../models/JobRole"
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

export const getJobRoleById = async (id: string): Promise<JobRole> => {
    try {
        const response: AxiosResponse = await axios.get(`${URL}/${id}`);
        
        return response.data;
    } catch(e){
        console.log(e);
        throw new Error('failed to get JobRole information');
    }
}
