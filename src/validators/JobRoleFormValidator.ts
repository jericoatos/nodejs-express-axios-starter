import { JobRoleRequest } from './../models/JobRoleRequest';

// Validate the job role form data
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

    if (!jobRole.description) {
        throw new Error("Job Spec Summary is required.");
    }

    if (!jobRole.sharepointUrl || !validateUrl(jobRole.sharepointUrl)) {
        throw new Error("Sharepoint Link must be a valid URL.");
    }

    if (!jobRole.responsibilities) {
        throw new Error("Responsibilities are required.");
    }

    if (isNaN(jobRole.numberOfOpenPositions) || jobRole.numberOfOpenPositions <= 0) {
        throw new Error("Number of Open Positions must be a positive integer.");
    }

    if (!jobRole.location) {
        throw new Error("Location is required.");
    }

    //make sure you cant eneter a date thats already passed
    if (!jobRole.closingDate) {
        throw new Error("Closing date is required.");
    }

   // if (!validateDate(jobRole.closingDate)) {
     //   throw new Error("Closing Date must be in the format 'DayName Day Month Year' (e.g., 'Monday 9 September 2024').");
   // }

    if (!jobRole.bandName) {
        throw new Error("Band Name is required.");
    }

    if (!jobRole.capabilityName) {
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
/*
// Validate the human-readable date format
export const validateDate = function (date: string): boolean {
    const [dayName, day, month, year] = date.split(' ');

    // Basic checks for format
    if (!dayName || !day || !month || !year) {
        return false;
    }

    const dayNumber = parseInt(day);
    const yearNumber = parseInt(year);

    // Validate day and year are numbers
    if (isNaN(dayNumber) || isNaN(yearNumber)) {
        return false;
    }

    // Check month name validity
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    if (!months.includes(month)) {
        return false;
    }

    // Check day and year are reasonable
    const monthIndex = months.indexOf(month);
    const dateForParsing = new Date(yearNumber, monthIndex, dayNumber);
    if (dateForParsing.getFullYear() !== yearNumber ||
        dateForParsing.getMonth() !== monthIndex ||
        dateForParsing.getDate() !== dayNumber) {
        return false;
    }

    // Additional check for day name
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const expectedDayName = dayNames[dateForParsing.getDay()];
    if (dayName !== expectedDayName) {
        return false;
    }

    return true;
};
*/
