import { validateLoginRequest } from './../../../src/validators/LoginRequestValidator';
import { assert, expect } from 'chai';
import { LoginRequest } from '../../../src/models/LoginRequest';

describe('LoginRequestValidator', function () {
    describe('validateLoginRequest', function () {

        it('should return error when email format is invalid', () => {
            const loginReq: LoginRequest = {
                email: "invalidatemail.com",
                password: "Pa$$word123!"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal("Invalid email or password!");
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when password is too short', () => {
            const loginReq: LoginRequest = {
                email: "valid@email.com",
                password: "Pa$$!1"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal("Invalid email or password!");
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when password has no lowercase', () => {
            const loginReq: LoginRequest = {
                email: "valid@email.com",
                password: "PA$$WORD123!"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal("Invalid email or password!");
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when password has no uppercase', () => {
            const loginReq: LoginRequest = {
                email: "valid@email.com",
                password: "pa$$word123!"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal("Invalid email or password!");
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when password has no digit(s)', () => {
            const loginReq: LoginRequest = {
                email: "valid@email.com",
                password: "Pa$$word!"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal("Invalid email or password!");
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when password has no special characters', () => {
            const loginReq: LoginRequest = {
                email: "valid@email.com",
                password: "Password123"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal("Invalid email or password!");
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when password has multiple formatting issues', () => {
            const errorString: string = "Invalid email or password!";

            const loginReq: LoginRequest = {
                email: "valid@email.com",
                password: "Password"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                console.log(e.message);
                expect(e.message).to.equal(errorString);
                return;
            }

            assert.fail("Expected error message");
        })

        it('should not throw exception when email and password formats are valid', () => {
            const loginReq: LoginRequest = {
                email: "validemail@email.com",
                password: "Pa$$word123!"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                assert.fail("Expected no error message");
            }
        })

        it('should return error when password field is empty', () => {
            const errorString: string = "Please enter password";

            const loginReq: LoginRequest = {
                email: "valid@email.com",
                password: ""
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal(errorString);
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when email field is empty', () => {
            const errorString: string = "Please enter email";

            const loginReq: LoginRequest = {
                email: "",
                password: "Pa$$word123!"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal(errorString);
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when both fields are empty', () => {
            const errorString: string = "Please enter email and password";

            const loginReq: LoginRequest = {
                email: "",
                password: ""
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal(errorString);
                return;
            }

            assert.fail("Expected error message");
        })
    })
})