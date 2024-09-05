import axios from 'axios';
import { describe, it } from "node:test";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { JobRole } from '../../../src/models/JobRole';
import { getJobRoleById, getJobRoles, URL } from "../../../src/services/JobRoleService";
import MockAdapter from 'axios-mock-adapter';
import { expect } from "chai";


const jobRoleResponse: JobRoleResponse = {
    jobRoleId: 1,
    roleName: "Software Engineer",
    location: "Belfast",
    capabilityName: "SoftDev",
    bandName: "Senior",
    closingDate: new Date(16930780000000)
}

const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
    describe('getJobRoles', function () {
        it('should return job roles from response', async () => {
            const data = [jobRoleResponse];

            mock.onGet(URL).reply(200, data);

            const results = await getJobRoles();    

            const expectedDate = jobRoleResponse.closingDate.toISOString();

            expect(results[0].roleName).to.deep.equal(jobRoleResponse.roleName);
            expect(results[0].location).to.deep.equal(jobRoleResponse.location);
            expect(results[0].capabilityName).to.deep.equal(jobRoleResponse.capabilityName);
            expect(results[0].bandName).to.deep.equal(jobRoleResponse.bandName);
            expect(results[0].closingDate).to.deep.equal(expectedDate);

        })

        it('should throw exception when 500 error returned from axios', async () => {
            mock.onGet(URL).reply(500);
    
            try {
              await getJobRoles();
            } catch (e) {
              expect(e.message).to.equal('Failed to get job roles');
              return;
            }
          })
    })
})
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
    describe('getJobRoleById', function () {
        it('should return job role by id from response', async () => {
            const id = jobRole.jobRoleId;
            const data = jobRole;

            mock.onGet(`${URL}/${id}`).reply(200, data);

            const result = await getJobRoleById(id.toString());            

            const expectedDate = jobRole.closingDate;

            expect(result.roleName).to.deep.equal(jobRole.roleName);
            expect(result.description).to.deep.equal(jobRole.description);
            expect(result.responsibilities).to.deep.equal(jobRole.responsibilities);
            expect(result.sharepointUrl).to.deep.equal(jobRole.sharepointUrl);
            expect(result.location).to.deep.equal(jobRole.location);
            expect(result.capabilityName).to.deep.equal(jobRole.capabilityName);
            expect(result.bandName).to.deep.equal(jobRole.bandName);
            expect(result.closingDate).to.deep.equal(expectedDate);
            expect(result.statusName).to.deep.equal(jobRole.statusName);
            expect(result.numberOfOpenPositions).to.deep.equal(jobRole.numberOfOpenPositions);
        });

        it('should throw an error when the API call fails with a 500 status', async () => {
            const id = jobRole.jobRoleId;
            mock.onGet(`${URL}/${id}`).reply(500);

            try {
                await getJobRoleById(id.toString());
            } catch (e) {
                expect(e.message).to.equal('failed to get JobRole information');
                return;
            }
        });
    });
});
it('should throw an error when the API returns a 404 status', async () => {
  const id = jobRole.jobRoleId; // Using a number for id
  mock.onGet(`${URL}/${id}`).reply(404); // Mocking a 404 response

  try {
      // Convert number `id` to string before passing it to the function
      await getJobRoleById(id.toString());
  } catch (e) {
      // Asserting that the error message is appropriate for a 404 error
      expect(e.message).to.equal('failed to get JobRole information');
      return;
  }
  throw new Error('Test failed: it should have thrown an error.');
});
