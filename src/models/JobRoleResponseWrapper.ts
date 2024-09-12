import { JobRole } from "./JobRole";
import { RoleOrdering } from "./SortModel"

export type JobRoleResponseWrapper = {
    jobRoles: JobRole[];
    roleOrdering: RoleOrdering;
}