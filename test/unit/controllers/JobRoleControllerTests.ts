import sinon from 'sinon';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import * as JobRoleService from "../../../src/services/JobRoleService";
import * as JobRoleController from "../../../src/controllers/JobRoleController";
import { expect } from 'chai';
import { Request, Response } from "express";
import { describe, afterEach, it } from "node:test";
import { JobRole } from '../../../src/models/JobRole';


const jobRoleResponse : JobRoleResponse = {
    jobRoleId: 2,
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

describe('JobRoleController', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('getSingleJobRole', function () {
        it('should render the view with job role data when job role is found', async () => {
            sinon.stub(JobRoleService, 'getJobRoleById').resolves(jobRole);

            const req: Partial<Request> = { params: { id: "2" } };
            const res = {
                render: sinon.spy(),
                status: sinon.stub().returnsThis(),
            } as unknown as Response;

            await JobRoleController.getSingleJobRole(req as Request, res as Response);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('job-role-information', { jobRole: jobRole })).to.be.true;
        });

        it('should return 404 and not render the view when job role is not found', async () => {
            sinon.stub(JobRoleService, 'getJobRoleById').resolves(null);

            const req: Partial<Request> = { params: { id: "999" } };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.spy(),
            } as unknown as Response;

            await JobRoleController.getSingleJobRole(req as Request, res as Response);

            expect(res.status.calledOnceWith(404)).to.be.true;
            expect(res.send.calledOnceWith('Job role not found')).to.be.true;
            expect(res.render.called).to.be.false;
        });

        it('should return 500 and not render the view when an error occurs', async () => {
            const errorMessage = "Error retrieving job role";
            sinon.stub(JobRoleService, 'getJobRoleById').rejects(new Error(errorMessage));

            const req: Partial<Request> = { params: { id: "2" } };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.spy(),
            } as unknown as Response;

            await JobRoleController.getSingleJobRole(req as Request, res as Response);

            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.send.calledOnceWith('Error retrieving job role')).to.be.true;
            expect(res.render.called).to.be.false;
        });
    });
});