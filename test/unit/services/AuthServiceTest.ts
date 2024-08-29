import sinon from 'sinon';
import { expect } from 'chai';
import { getAuthToken, URL } from './../../../src/services/AuthService';
import { LoginRequest } from './../../../src/models/LoginRequest';
import MockAdapter from "axios-mock-adapter";
import { requestInstance } from '../../../src/index';

describe('AuthService', function () {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    const VALID_EMAIL = process.env.VALID_TEST_EMAIL;
    const VALID_PASSWORD = process.env.VALID_TEST_PASSWORD;
    const VALID_LOGIN_REQUEST: LoginRequest = {
        email: String(VALID_EMAIL),
        password: String(VALID_PASSWORD)
    };
    const INVALID_LOGIN_REQUEST: LoginRequest = {
        email: 'invalid',
        password: 'invalid'
    };
    const RESPONSE_TOKEN: string = "mock.token.response";

    describe('getAuthToken', function () {
        const requestMockInstance = new MockAdapter(requestInstance);

        it('should return JWT token in response data for a valid LoginRequest', async () => {
            const data = RESPONSE_TOKEN;
            requestMockInstance.onPost(URL, VALID_LOGIN_REQUEST).reply(200, data);

            try {
                const result = await getAuthToken(VALID_LOGIN_REQUEST);
                expect(result).to.deep.equal(RESPONSE_TOKEN);
            } catch (error) {
                expect.fail("Expected no error");
            }
        });

        it('should throw error for an invalid LoginRequest without sending POST request', async () => {
            try {
                await getAuthToken(INVALID_LOGIN_REQUEST);
                expect.fail("Expected to catch error");
            } catch (error) {
                expect(error.message).to.equal("Invalid email or password!");
            }
        });
    });
});

