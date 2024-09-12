export type JobRoleRequest = {
    roleName: string,
    description: string,
    responsibilities: string,
    sharepointUrl: string,
    location: string,
    capabilityId: number,
    bandId: number,
    closingDate: string,
    statusName: 'Open',
    numberOfOpenPositions: number
}