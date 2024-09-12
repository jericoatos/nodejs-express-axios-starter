import sinon, { SinonSpy } from 'sinon';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import * as JobRoleService from "../../../src/services/JobRoleService";
import * as JobRoleController from "../../../src/controllers/JobRoleController";
import { expect } from 'chai';
import { Request, Response } from "express";
import { describe, afterEach, it } from "node:test";
import { JobRole } from '../../../src/models/JobRole';
import { Session, SessionData } from 'express-session';
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

        afterEach(() => {
            sinon.restore();
        });

    it('should render view when job roles are returned', async () => {
        const jobRoleList = [jobRoleResponse];

        sinon.stub(JobRoleService, 'getJobRoles').resolves(jobRoleList);

        const req: Partial<Request> = {
            query: {
                orderBy: 'name',
                direction: 'asc',
            },
            session: {
                token: 'test-token',
            } as Session & Partial<SessionData>,
        };

        const res = {
            render: sinon.spy() as SinonSpy, 
            locals: { errorMessage: '' },
        } as unknown as Response;

        await JobRoleController.getAllJobRoles(req as Request, res as Response);

        expect((res.render as SinonSpy).calledOnce).to.be.true; 
        expect((res.render as SinonSpy).calledWith('job-role-list', {
            jobRoles: jobRoleList,
            orderBy: 'name',
            direction: 'asc',
        })).to.be.true; 
    });

    it('should render view with error message when error thrown', async () => {
        const errorMessage = 'Error message';

        sinon.stub(JobRoleService, 'getJobRoles').rejects(new Error(errorMessage));

        const req: Partial<Request> = {
            query: {
                orderBy: 'name',
                direction: 'asc',
            },
            session: {
                token: 'test-token',
            } as Session & Partial<SessionData>,
        };

        const res = {
            render: sinon.spy() as SinonSpy, 
            locals: { errorMessage: 'Error message' },
        } as unknown as Response;

        await JobRoleController.getAllJobRoles(req as Request, res as Response);

        expect((res.render as SinonSpy).calledOnce).to.be.true;
        expect((res.render as SinonSpy).calledWith('job-role-list', {
            jobRoles: [],
            orderBy: 'name',
            direction: 'asc',
        })).to.be.true;

        expect(res.locals.errorMessage).to.equal(errorMessage);
    });
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
                    const errorMessage = "Error retrieving job role";
                    sinon.stub(JobRoleService, 'getJobRoleById').rejects(new Error(errorMessage));
                
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
                session: { token: 'valid-token' },  
                body: jobRolerequest
            } as unknown as Request;
            const res = {
                redirect: sinon.spy(),
                render: sinon.spy(),
            } as unknown as Response;
    
            await JobRoleController.postJobRoleForm(req, res);
    
            expect((res.redirect as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.redirect as sinon.SinonSpy).calledWith(`/job-roles/${createdJobRoleId}`)).to.be.true;  
            expect((res.render as sinon.SinonSpy).notCalled).to.be.true;
        });

        it('should render view as admin if logged in', async () => {
            const req = { session: { token: 'admin-token' } } as unknown as Request;  
            const res = {
                render: sinon.spy(),
                locals: { isAdmin: true }  
            } as unknown as Response;
        
            await JobRoleController.getJobRoleForm(req, res);
        
            expect(res.locals.isAdmin).to.be.true;  
            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('job-role-form.html')).to.be.true;
        });
        

   describe('JobRoleController', () => {
    const jobRoleRequest = {
        roleName: "Software Engineer",
        description: "Develops software.",
        sharepointUrl: "https://sharepoint.example.com",
        responsibilities: "Write clean code.",
        numberOfOpenPositions: 5,
        location: "New York",
        closingDate: "2024-12-31",
        bandId: 4,
        capabilityId: 2
    } as JobRoleRequest;

    const token = 'test-token';  

    afterEach(() => {
        sinon.restore();  
    });

    it('should render the form with an error message when creation fails', async () => {
        const errorMessage = 'Error creating job role';

        
        sinon.stub(JobRoleService, 'createJobRole').rejects(new Error(errorMessage));

        const req = {
            body: jobRoleRequest,
            session: { token: token }  
        } as unknown as Request;

        const res = {
            render: sinon.spy(),
            locals: {} as { errorMessage?: string },
        } as unknown as Response;

        
        await JobRoleController.postJobRoleForm(req, res);

        
        console.log('render called with:', (res.render as sinon.SinonSpy).getCall(0)?.args);

       
        expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;  
        expect((res.render as sinon.SinonSpy).calledWith('job-role-form.html', req.body)).to.be.true;

        
        expect(res.locals.errormessage).to.equal(errorMessage);
    });

    it('should handle empty request body in postJobRoleForm', async () => {
        const req = {
            body: {},  
            session: { token: token }  
        } as unknown as Request;

        const res = {
            render: sinon.spy(),
            locals: {} as { errorMessage?: string },
        } as unknown as Response;

        
        const validationErrorMessage = 'Job Role Name is required.';
        sinon.stub(JobRoleService, 'createJobRole').rejects(new Error(validationErrorMessage));

        
        await JobRoleController.postJobRoleForm(req, res);

        
        console.log('render called with:', (res.render as sinon.SinonSpy).getCall(0)?.args);

       
        expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;  
        expect((res.render as sinon.SinonSpy).calledWith('job-role-form.html', req.body)).to.be.true;

        
        expect(res.locals.errormessage).to.equal(validationErrorMessage);
    });
});
    });
});