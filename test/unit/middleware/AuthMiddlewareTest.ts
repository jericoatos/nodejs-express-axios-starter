import { expect } from 'chai';
import sinon from 'sinon';
import express from "express";
import { allowRoles } from '../../../src/middleware/AuthMiddleware';
import { UserRole } from '../../../src/models/JwtToken';
import "core-js/stable/atob";
import jwt from 'jsonwebtoken';
 
describe('Authorization Middleware', function () {
  afterEach(() => {
      sinon.restore();
  });
 
  describe('allowRoles', function () {
    it('should return 401 when user is NOT logged in', async () => {
        const req = {
          session: { token: undefined }
        } as Partial<express.Request> as express.Request;
    
        const statusStub = sinon.stub().returnsThis() as sinon.SinonStub;
        const sendStub = sinon.stub().returnsThis() as sinon.SinonStub;
    
        const res = {
          status: statusStub,
          send: sendStub
        } as Partial<express.Response> as express.Response;
    
        const next = sinon.stub();
    
        const middleware = allowRoles([UserRole.Admin, UserRole.User]);
    
        await middleware(req as express.Request, res as express.Response, next);
    
        expect(statusStub.calledOnce).to.be.true;
        expect(statusStub.calledWith(401)).to.be.true;
    
        expect(sendStub.calledOnce).to.be.true;
        expect(sendStub.calledWith('Not logged in')).to.be.true;
    
        expect(next.notCalled).to.be.true;
      });
    });
    
 

    it('should call next() when user is logged in with a valid token and has an authorized role', async () => {
        const secretKey = 'SUPER_SECRET';
        const validJwtToken = jwt.sign({ Role: UserRole.Admin }, secretKey, { expiresIn: '8h' });
    
        const req: Partial<express.Request> = {
          session: { token: validJwtToken }
        } as express.Request;
    
        const statusStub = sinon.stub().returnsThis() as sinon.SinonStub;
        const sendStub = sinon.stub().returnsThis() as sinon.SinonStub;
        const redirectStub = sinon.stub().returnsThis() as sinon.SinonStub;
    
        const res: Partial<express.Response> = {
            status: statusStub,
            send: sendStub,
            redirect: redirectStub
        } as unknown as express.Response;
    
        const next = sinon.stub();
    
        const middleware = allowRoles([UserRole.Admin]);
    
        await middleware(req as express.Request, res as express.Response, next);
    
        expect(next.calledOnce).to.be.true;
    
        expect(statusStub.notCalled).to.be.true;
        expect(sendStub.notCalled).to.be.true;
        expect(redirectStub.notCalled).to.be.true;
      });
    });