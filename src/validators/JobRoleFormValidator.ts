import { JobRoleRequest } from './../models/JobRoleRequest';


export const validateJobRoleForm = function (jobRole: JobRoleRequest): void {
    if (!jobRole.roleName) {
        throw new Error("Job Role Name is required.");
    }

    if(jobRole.roleName.length > 50){
        throw new Error('Job Role name is too long.');
    }

    if(jobRole.roleName.length < 5){
        throw new Error('Job Role name is too short.');
    }
    const roleNamePattern = /^[A-Za-z\s]+$/; 
    if (!roleNamePattern.test(jobRole.roleName)) {
        throw new Error('Job Role name can only contain letters and spaces.');
    }

    if (!jobRole.description) {
        throw new Error("Job Spec Summary is required.");
    }
    const descriptionPattern = /^[A-Za-z\s.,!?'""-]+$/; 

    if (!descriptionPattern.test(jobRole.description)) {
    throw new Error('Job Spec Summary can only contain letters, spaces, full stops, commas, exclamation marks, question marks, and quotation marks.');
    } 
   

    if (!jobRole.sharepointUrl || !validateUrl(jobRole.sharepointUrl)) {
        throw new Error("Sharepoint Link must be a valid URL.");
    }

    if (!jobRole.responsibilities) {
        throw new Error("Responsibilities are required.");
    } 
    const responsibilitiesPattern = /^[A-Za-z\s.,!?'""-]+$/; 

    if (!responsibilitiesPattern.test(jobRole.responsibilities)) {
    throw new Error('Responsibilities can only contain letters, spaces, full stops, commas, exclamation marks, question marks, and quotation marks.');
    }   
 

    if (isNaN(jobRole.numberOfOpenPositions)) {
        throw new Error("Number of Open Positions must be a valid number.");
    }

    if (jobRole.numberOfOpenPositions <= 0) {
        throw new Error("Number of Open Positions must be greater than 0.");
    }

    if (!jobRole.location) {
        throw new Error("Location is required.");
    }
    const locationpattern = /^[A-Za-z\s]+$/; 
    if (!locationpattern.test(jobRole.location)) {
        throw new Error('Job Role location can only contain letters and spaces.');
    }

    //make sure you cant enter a date thats already passed
    if (!jobRole.closingDate) {
        throw new Error("Closing date is required.");
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of today

    const closingDate = new Date(jobRole.closingDate);

    if (closingDate < today) {
        throw new Error("Closing date cannot be in the past.");
    }

    if (!jobRole.bandId) {
        throw new Error("Band Name is required.");
    }

    if (!jobRole.capabilityId) {
        throw new Error("Capability Name is required.");
    }
};

// Validate a URL
export const validateUrl = function (url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

