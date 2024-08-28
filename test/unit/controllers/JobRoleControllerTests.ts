import sinon from "sinon";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import * as JobRoleService from "../../../src/services/JobRoleService";
import * as JobRoleController from "../../../src/controllers/JobRoleController";
import { expect } from "chai";
import { Request, Response } from "express";


const jobRoleResponse : JobRoleResponse = {
    roleName: "Software Engineer",
    location: "Belfast",
    capabilityName: "SoftDev",
    bandName: "Senior",
    closingDate: new Date(16930780000000)
}

describe('EmployeeController', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('getAllJobRoles', function () {
        it('should render view when job roles returned', async () => {
            const jobRoleList = [jobRoleResponse];

            sinon.stub(JobRoleService, 'getJobRoles').resolves(jobRoleList);
            const req: Partial<Request> = {}; 
            const res = {
                render: sinon.spy(), 
                locals: { errorMessage: '' }, 
            } as unknown as Response;


            await JobRoleController.getAllJobRoles(req as Request, res as Response);

            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('job-role-list')).to.be.true;
        });

        it('should render view with error message when error thrown', async () => {
            const errorMessage: string = "Error message";
            sinon.stub(JobRoleService, 'getJobRoles').rejects(new Error(errorMessage));
        
            const req: Partial<Request> = {}; 
            const res = {
                render: sinon.spy(), 
                locals: { errorMessage: '' }, 
            } as unknown as Response;
        
            await JobRoleController.getAllJobRoles(req as Request, res as Response);
        
            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
        
            expect((res.render as sinon.SinonSpy).calledWith('job-role-list')).to.be.true;
        
            expect(res.locals.errorMessage).to.equal(errorMessage);
        });
    })
})