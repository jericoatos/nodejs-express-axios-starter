export type JobRoleRequest = {
    //jobRoleId: number,
    roleName: string,
    description: string,
    responsibilities: string,
    sharepointUrl: string,
    location: string,
    capabilityName: string,
    bandName: string,
    closingDate: string,
    statusName: 'Open',
    numberOfOpenPositions: number
}