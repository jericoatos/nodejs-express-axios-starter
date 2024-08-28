import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/'; 

export const URL: string = "/api/test";


export const getDatabases = async (): Promise<string[]> => {
    try {
        
        const response: AxiosResponse = await axios.get(URL);
        
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get databases');
    }
}