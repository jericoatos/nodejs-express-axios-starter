import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, it } from "node:test";
import { expect } from "chai";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { JobRole } from '../../../src/models/JobRole';
import { getJobRoleById, getJobRoles, URL } from "../../../src/services/JobRoleService";

const mock = new MockAdapter(axios);

const jobRoleResponse: JobRoleResponse = {
    jobRoleId: 1,
    roleName: "Software Engineer",
    location: "Belfast",
    capabilityName: "SoftDev",
    bandName: "Senior",
    closingDate: new Date(1693078000000) 
};

const jobRole: JobRole = {
  jobRoleId: 2,
  roleName: "Software Engineer",
  description: "Develops, tests, and maintains software applications.",
  responsibilities: "Design, develop, and maintain software applications, collaborate with other engineers, perform code reviews.",
  sharepointUrl: "https://sharepoint.com/job/software-engineer",
  location: "New York",
  capabilityName: "Software Development",
  bandName: "Junior",
  closingDate: "Sun Sep 15 2024",
  statusName: "Open",
  numberOfOpenPositions: 3
};

describe('JobRoleService', function () {
    const token = 'test-token';

    describe('getJobRoles', function () {
        it('should return Job Roles from response without ordering', async () => {
            const data = [jobRoleResponse];

            mock.onGet(URL).reply(200, data);

            const results = await getJobRoles(token);

            expect(results[0].jobRoleId).to.equal(jobRoleResponse.jobRoleId);
            expect(results[0].roleName).to.equal(jobRoleResponse.roleName);
            expect(results[0].location).to.equal(jobRoleResponse.location);
            expect(results[0].capabilityName).to.equal(jobRoleResponse.capabilityName);
            expect(results[0].bandName).to.equal(jobRoleResponse.bandName);
            expect(new Date(results[0].closingDate).getTime()).to.equal(jobRoleResponse.closingDate.getTime());
        });

        it('should return Job Roles from response with ordering', async () => {
            const data = [jobRoleResponse];
            const params = { orderBy: 'roleName', direction: 'ASC' };

            mock.onGet(URL, { params }).reply(200, data);

            const results = await getJobRoles(token, 'roleName', 'ASC');

            expect(results[0].jobRoleId).to.equal(jobRoleResponse.jobRoleId);
            expect(results[0].roleName).to.equal(jobRoleResponse.roleName);
            expect(results[0].location).to.equal(jobRoleResponse.location);
            expect(results[0].capabilityName).to.equal(jobRoleResponse.capabilityName);
            expect(results[0].bandName).to.equal(jobRoleResponse.bandName);
            expect(new Date(results[0].closingDate).getTime()).to.equal(jobRoleResponse.closingDate.getTime());
        });


        it('should throw exception when 500 error returned from axios', async () => {
            mock.onGet(URL).reply(500);

            try {
                await getJobRoles(token);
            } catch (e) {
                expect(e.message).to.equal('Failed to get job roles');
            }
        });
    });

    describe('getJobRoleById', function () {
        it('should return job role by id from response', async () => {
            const id = jobRole.jobRoleId;
            mock.onGet(`${URL}/${id}`).reply(200, jobRole);

            const result = await getJobRoleById(id.toString(), token);

            expect(result.roleName).to.equal(jobRole.roleName);
            expect(result.description).to.equal(jobRole.description);
            expect(result.responsibilities).to.equal(jobRole.responsibilities);
            expect(result.sharepointUrl).to.equal(jobRole.sharepointUrl);
            expect(result.location).to.equal(jobRole.location);
            expect(result.capabilityName).to.equal(jobRole.capabilityName);
            expect(result.bandName).to.equal(jobRole.bandName);
            expect(result.closingDate).to.equal(jobRole.closingDate);
            expect(result.statusName).to.equal(jobRole.statusName);
            expect(result.numberOfOpenPositions).to.equal(jobRole.numberOfOpenPositions);
        });

        it('should throw an error when the API call fails with a 500 status', async () => {
            const id = jobRole.jobRoleId;
            mock.onGet(`${URL}/${id}`).reply(500);

            try {
                await getJobRoleById(id.toString(), token);
            } catch (e) {
                expect(e.message).to.equal('failed to get JobRole information');
            }
        });

        it('should throw an error when the API returns a 404 status', async () => {
            const id = jobRole.jobRoleId;
            mock.onGet(`${URL}/${id}`).reply(404);

            try {
                await getJobRoleById(id.toString(), token);
            } catch (e) {
                expect(e.message).to.equal('failed to get JobRole information');
            }
        });
    });
});
