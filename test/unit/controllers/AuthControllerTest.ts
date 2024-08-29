import { afterEach, describe, it } from 'node:test';
import * as AuthController from '../../../src/controllers/AuthController'
import * as AuthService from '../../../src/services/AuthService';
import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';

describe('AuthController', function () {

    afterEach(() => {
        sinon.restore();
    });

    const VALID_EMAIL = 'validadmin@email.com';
    const VALID_PASSWORD = 'validPa$$word123!'

    describe('logout', function () {
        it('should set token to undefined and redirect to login page', async () => {
            const req = {
                session: { token: '' }
            } as Partial<Request> as Request;

            const res = {
                redirect: sinon.spy()
            } as Partial<Response> as Response;

            await AuthController.logout(req, res);

            expect((res.redirect as sinon.SinonSpy).calledWith('/loginForm')).to.be.true;
            expect(req.session.token).to.be.undefined;
        });
    });

    describe('getLoginForm', function () {
        it('should render loginForm', async () => {
            const req = {} as Request;
            const res = {
                render: sinon.spy(),
                locals: { loggedin: false }
            } as unknown as Response;

            await AuthController.getLoginForm(req, res);

            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('loginForm')).to.be.true;
        });
    });
    
    
    describe('postLoginForm', function () {
        it('should redirect when successfully retrieves JWT Token', async () => {
            sinon.stub(AuthService, 'getAuthToken').resolves("token");
    
            const req = {
                body: {
                    email: VALID_EMAIL,
                    password: VALID_PASSWORD
                },
                session: {
                    token: ""
                }
            } as Partial<Request> as Request;
    
            const res = {
                redirect: sinon.spy(),
                render: sinon.spy(),
                locals: { errormessage: '' }
            } as Partial<Response> as Response;
    
            await AuthController.postLoginForm(req, res);
    
            expect(req.session.token).to.equal("token");
            expect((res.redirect as sinon.SinonSpy).calledWith('/')).to.be.true;
        });
    
        it('should redirect to loginForm with errormessage and form data in body when email is invalid', async () => {
            const error = "Error";
            sinon.stub(AuthService, 'getAuthToken').rejects(new Error(error));
    
            const req = {
                body: {
                    email: 'invalid',
                    password: VALID_PASSWORD
                }
            } as Partial<Request> as Request;
    
            const res = {
                render: sinon.spy(),
                locals: { errormessage: '' }
            } as Partial<Response> as Response;
    
            await AuthController.postLoginForm(req, res);
    
            expect((res.render as sinon.SinonSpy).calledWith('loginForm')).to.be.true;
            expect(res.locals.errormessage).to.equal(error);
            expect(req.body.email).to.equal('invalid');
            expect(req.body.password).to.equal(VALID_PASSWORD);
        });
    
        it('should redirect to loginForm with errormessage and form data in body when password is invalid', async () => {
            const error = "Error";
            sinon.stub(AuthService, 'getAuthToken').rejects(new Error(error));
    
            const req = {
                body: {
                    email: VALID_EMAIL,
                    password: 'invalid'
                }
            } as Partial<Request> as Request;
    
            const res = {
                render: sinon.spy(),
                locals: { errormessage: '' }
            } as Partial<Response> as Response;
    
            await AuthController.postLoginForm(req, res);
    
            expect((res.render as sinon.SinonSpy).calledWith('loginForm')).to.be.true;
            expect(res.locals.errormessage).to.equal(error);
            expect(req.body.password).to.equal('invalid');
            expect(req.body.email).to.equal(VALID_EMAIL);
        });
    });
    
    describe('logout', function () {
        it('should set token to undefined and redirect to login page', async () => {
            const req = {
                session: { token: '' }
            } as Partial<Request> as Request;
    
            const res = {
                redirect: sinon.spy()
            } as Partial<Response> as Response;
    
            await AuthController.logout(req, res);
    
            expect((res.redirect as sinon.SinonSpy).calledWith('/loginForm')).to.be.true;
            expect(req.session.token).to.be.undefined;
        });
    });
})    