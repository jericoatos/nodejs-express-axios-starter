import sinon from 'sinon';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import * as JobRoleService from "../../../src/services/JobRoleService";
import * as JobRoleController from "../../../src/controllers/JobRoleController";
import { expect } from 'chai';
import { Request, Response } from "express";
import { describe, afterEach, it } from "node:test";
import { JobRole } from '../../../src/models/JobRole';
import { JobRoleRequest } from '../../../src/models/JobRoleRequest';

const jobRoleResponse : JobRoleResponse = {
    jobRoleId: 2,
    roleName: "Software Engineer",
    location: "Belfast",
    capabilityName: "SoftDev",
    bandName: "Senior",
    closingDate: new Date(16930780000000)
}

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

const jobRolerequest: JobRoleRequest = {
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



describe('JobRoleController', function () {
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
        
            const req = { params: { id: '1' }, session: { token: 'test-token' } };
            const res = {
                render: sinon.spy(), 
                locals: { errorMessage: '' }, 
            } as unknown as Response;
        
            await JobRoleController.getAllJobRoles(req as unknown as Request, res as Response);
        
            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
        
            expect((res.render as sinon.SinonSpy).calledWith('job-role-list')).to.be.true;
        
            expect(res.locals.errorMessage).to.equal(errorMessage);
        });
    })
})


describe('JobRoleController', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('getSingleJobRole', function () {
        it('should render view with job role data when job role is found', async () => {
            const getJobRoleByIdStub = sinon.stub(JobRoleService, 'getJobRoleById').resolves(jobRole);
            
            const req = { params: { id: "2" }, session: { token: 'test-token' }};
            const res = {
                render: sinon.spy(),
                status: sinon.stub().returnsThis(),
                redirect: sinon.spy(),
                send: sinon.spy(),
            } as unknown as Response;
        
            await JobRoleController.getSingleJobRole(req as unknown as Request, res as Response);
        
            const renderSpy = res.render as sinon.SinonSpy;
            expect(renderSpy.calledOnce).to.be.true;
            expect(renderSpy.calledWith('job-role-information', { jobRole: jobRole })).to.be.true;
        
            const statusStub = res.status as sinon.SinonStub;
            expect(statusStub.notCalled).to.be.true;
        
            expect(getJobRoleByIdStub.calledOnceWith("2", 'test-token')).to.be.true;
        });
        
        describe('JobRoleController', function () {
            afterEach(() => {
                sinon.restore();
            });
        
            describe('getSingleJobRole', function () {
                it('should return 404 and redirect to error page when job role is not found', async () => {
                    
                    sinon.stub(JobRoleService, 'getJobRoleById').resolves(null);
                
                    const req = {
                        params: { id: "999" },
                        session: { token: 'test-token' }
                    } as unknown as Request;
                    
                    const res = {
                        status: sinon.stub().returnsThis(),
                        redirect: sinon.spy(),
                        render: sinon.spy(),
                        send: sinon.spy(),
                    } as unknown as Response;
                
                    await JobRoleController.getSingleJobRole(req as unknown as Request, res as Response);

                    const statusStub = res.status as sinon.SinonStub;
                    expect(statusStub.calledOnceWith(404)).to.be.true;
                
                    const redirectSpy = res.redirect as sinon.SinonSpy;
                    expect(redirectSpy.calledOnceWith('../error')).to.be.true;
                
                    const renderSpy = res.render as sinon.SinonSpy;
                    expect(renderSpy.notCalled).to.be.true;
                
                    const sendSpy = res.send as sinon.SinonSpy;
                    expect(sendSpy.notCalled).to.be.true;
                });
        
                it('should return 500 and redirect to error page when an error occurs', async () => {
                    // Stub the service call to throw an error
                    const errorMessage = "Error retrieving job role";
                    sinon.stub(JobRoleService, 'getJobRoleById').rejects(new Error(errorMessage));
                
                    // Mock request and response objects
                    const req = {
                        params: { id: "2" },
                        session: { token: 'test-token' }
                    } as unknown as Request;
                    
                    const res = {
                        status: sinon.stub().returnsThis(),
                        redirect: sinon.spy(),
                        render: sinon.spy(),
                        send: sinon.spy(),
                    } as unknown as Response;
                

                    await JobRoleController.getSingleJobRole(req as unknown as Request, res as Response);
                
                    const statusStub = res.status as sinon.SinonStub;
                    expect(statusStub.calledOnceWith(500)).to.be.true;
                
                    const redirectSpy = res.redirect as sinon.SinonSpy;
                    expect(redirectSpy.calledOnceWith('../error')).to.be.true;

                    const renderSpy = res.render as sinon.SinonSpy;
                    expect(renderSpy.notCalled).to.be.true;
                
                    const sendSpy = res.send as sinon.SinonSpy;
                    expect(sendSpy.notCalled).to.be.true;
                });                
            });
        });  
    });

    describe('getErrorMessage', function () {
        it('should render error view', async() => {
            const req = {} as Request;
            const res = {
                render: sinon.spy(),
            } as unknown as Response;

            await JobRoleController.getErrorMessage(req,res);
            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('error')).to.be.true;

        });
    });

    describe('getJobRoleForm', function(){
    it('should render the job role form view', async() => {
        const req = {} as Request;
        const res = {
            render: sinon.spy(),
        } as unknown as Response;

        await JobRoleController.getJobRoleForm(req,res);

        expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
        expect((res.render as sinon.SinonSpy).calledWith('job-role-form.html')).to.be.true;
    });
    });

    describe('postJobRoleForm', function(){
        it('should redirect to the jobrole page when the job role is created successfully', async() => {

            const createdJobRoleId = 12;
            sinon.stub(JobRoleService, 'createJobRole').resolves(createdJobRoleId);
    
            const req = {
                session: { token: 'valid-token' },  // Mock the session token
                body: jobRolerequest
            } as unknown as Request;
            const res = {
                redirect: sinon.spy(),
                render: sinon.spy(),
            } as unknown as Response;
    
            await JobRoleController.postJobRoleForm(req, res);
    
            expect((res.redirect as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.redirect as sinon.SinonSpy).calledWith(`/job-roles/${createdJobRoleId}`)).to.be.true;  // Fix the string interpolation
            expect((res.render as sinon.SinonSpy).notCalled).to.be.true;
        });

        it('should render view as admin if logged in', async () => {
            const req = { session: { token: 'admin-token' } } as unknown as Request;  // Token for an admin
            const res = {
                render: sinon.spy(),
                locals: { isAdmin: true }  // Set admin status explicitly for the test
            } as unknown as Response;
        
            await JobRoleController.getJobRoleForm(req, res);
        
            expect(res.locals.isAdmin).to.be.true;  // Ensure admin status is set
            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('job-role-form.html')).to.be.true;
        });
        
   
        it('should render the form with an error message when creation fails', async() => {

            const errorMessages = 'Error creating job role';
            sinon.stub(JobRoleService, 'createJobRole').rejects(new Error(errorMessages));

            const req = {
                body: jobRolerequest,
            } as unknown as Request;
            const res = {
                render: sinon.spy(),
                locals: {} as { errorMessage?: string},
            } as unknown as Response;

            await JobRoleController.postJobRoleForm(req, res);

            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('job-role-form.html', req.body)).to.be.true;
            expect(res.locals.errorMessage).to.equal(errorMessages);
        })
    })
});

