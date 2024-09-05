import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import { describe, it, afterEach } from 'mocha';
import * as AuthController from '../../../src/controllers/AuthController';
import * as AuthService from '../../../src/services/AuthService';

describe('AuthMiddleware', function () {
  afterEach(() => {
    sinon.restore();
  });

  describe('logout', function () {
    it('should set token to undefined and redirect to login page', async () => {
      const req = {
        session: { token: '' },
      } as Partial<Request> as Request;

      const res = {
        redirect: sinon.stub() as sinon.SinonStub,
      };

      await AuthController.logout(req, res as unknown as Response);

      expect(res.redirect.calledWith('/loginForm')).to.be.true;
      expect(req.session.token).to.be.undefined;
    });
  });

  describe('getLoginForm', function () {
    it('should render loginForm', async () => {
      const req = {} as Request;
      const res = {
        render: sinon.stub() as sinon.SinonStub,
        locals: { loggedin: false },
      };

      await AuthController.getLoginForm(req, res as unknown as Response);

      expect(res.render.calledOnce).to.be.true;
      expect(res.render.calledWith('loginForm')).to.be.true;
    });
  });

  describe('postLoginForm', function () {
    const VALID_PASSWORD = 'validPa$$word123!';

    it('should show an error message when email is invalid', async () => {
      const error = 'Error';
      sinon.stub(AuthService, 'getAuthToken').rejects(new Error(error));

      const req = {
        body: {
          email: 'invalid',
          password: VALID_PASSWORD,
        },
      } as Partial<Request> as Request;

      const res = {
        render: sinon.stub() as sinon.SinonStub,
        locals: { errormessage: '' },
      };

      await AuthController.postLoginForm(req, res as unknown as Response);

      expect(res.render.calledWith('loginForm')).to.be.true;
      expect(res.locals.errormessage).to.equal(error);
      expect(req.body.email).to.equal('invalid');
      expect(req.body.password).to.equal(VALID_PASSWORD);
    });
  });
});
