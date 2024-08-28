import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';
export const URL: string = "/api/job-roles/";


export const getJobRoles = async (): Promise<JobRoleResponse[]> => {
    try{
        const response: AxiosResponse = await axios.get(URL);
        return response.data;
    } catch (e){
        if(e.response?.status === 500){
            throw new Error("Failed to get job roles");
        }
        throw new Error(e.message);
    }
} 
