import axios from "axios"
import { describe, it } from "node:test";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse"
import { getJobRoles, URL } from "../../../src/services/JobRoleService"
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";

const jobRoleResponse: JobRoleResponse = {
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
            const token = 'test-token';

            mock.onGet(URL).reply(200, data);

            const results = await getJobRoles(token);    

            const expectedDate = jobRoleResponse.closingDate.toISOString();

            expect(results[0].roleName).to.deep.equal(jobRoleResponse.roleName);
            expect(results[0].location).to.deep.equal(jobRoleResponse.location);
            expect(results[0].capabilityName).to.deep.equal(jobRoleResponse.capabilityName);
            expect(results[0].bandName).to.deep.equal(jobRoleResponse.bandName);
            expect(results[0].closingDate).to.deep.equal(expectedDate);

        })

        it('should throw exception when 500 error returned from axios', async () => {
            mock.onGet(URL).reply(500);
            const token = 'test-token';
    
            try {
              await getJobRoles(token);
            } catch (e) {
              expect(e.message).to.equal('Failed to get job roles');
              return;
            }
          })
    })
})
