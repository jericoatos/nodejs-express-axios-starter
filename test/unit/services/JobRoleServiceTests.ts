import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, it } from "node:test";
import { expect } from "chai";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { JobRole } from '../../../src/models/JobRole';
import { createJobRole, getJobRoleById, getJobRoles, URL } from "../../../src/services/JobRoleService";
import { JobRoleRequest } from '../../../src/models/JobRoleRequest';

const mock = new MockAdapter(axios);

const jobRoleResponse: JobRoleResponse = {
    jobRoleId: 1,
    roleName: "Software Engineer",
    location: "Belfast",
    capabilityName: "SoftDev",
    bandName: "Senior",
    closingDate: new Date(1693078000000) // Ensure this is a valid date
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
const jobRoleRequest: JobRoleRequest = {
  roleName: "Software Engineer",
  description: "Develops, tests, and maintains software applications.",
  sharepointUrl: "https://sharepoint.com/job/software-engineer",
  responsibilities: "Design, develop, and maintain software applications, collaborate with other engineers, perform code reviews.",
  numberOfOpenPositions: 3,
  location: "New York",
  closingDate: new Date().toISOString(),
  bandId: 1,
  capabilityId: 1,
  statusName: 'Open'
};

describe('JobRoleService', function () {
    const token = 'test-token';

    describe('getJobRoles', function () {
        it('should return job roles from response', async () => {
            const data = [jobRoleResponse];
            mock.onGet(URL).reply(200, data);

            const results = await getJobRoles(token);

            expect(results[0].roleName).to.equal(jobRoleResponse.roleName);
            expect(results[0].location).to.equal(jobRoleResponse.location);
            expect(results[0].capabilityName).to.equal(jobRoleResponse.capabilityName);
            expect(results[0].bandName).to.equal(jobRoleResponse.bandName);
            expect(results[0].closingDate).to.equal(jobRoleResponse.closingDate.toISOString());
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


    describe('createJobRole', function () {
      it('should create a job role and return the job role ID', async () => {
        
          const responseId = 12; 
          mock.onPost('http://localhost:8080/api/job-roles', jobRoleRequest).reply(200, responseId);

          const result = await createJobRole(jobRoleRequest);

          expect(result).to.equal(responseId);
      });

      it('should throw an error when validation fails', async () => {
          const invalidJobRoleRequest: JobRoleRequest = {
            roleName: "", //role name not entered
            description: "Description",
            sharepointUrl: "https://kainos.com",
            responsibilities: "Testing, develping, designing and communicating with others",
            numberOfOpenPositions: 5,
            location: "Gdansk",
            closingDate: new Date().toISOString(),
            bandId: 1,
            capabilityId: 1,
            statusName: 'Open'
          };

          try {
              await createJobRole(invalidJobRoleRequest);
          } catch (e) {
              expect(e.message).to.equal("Job Role Name is required."); 
              return;
          }

          throw new Error("Expected validation error was not thrown.");
      });
      it('should throw an error when the API call fails with a 400 status', async () => {
          

        mock.onPost('http://localhost:8080/api/job-roles', jobRoleRequest).reply(400, "Bad request");

        try {
            await createJobRole(jobRoleRequest);
        } catch (e) {
            expect(e.message).to.equal('Bad request');
            return;
        }
        throw new Error("Expected client error was not thrown.");
    });
  });

      it('should throw an error when the API call fails with a 500 status', async () => {
        
          mock.onPost('http://localhost:8080/api/job-roles', jobRoleRequest).reply(500, "Server error");

          try {
              await createJobRole(jobRoleRequest);
          } catch (e) {
              expect(e.message).to.equal('Server error');
              return;
          }

          throw new Error("Expected server error was not thrown.");
      });
});