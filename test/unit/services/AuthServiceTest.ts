import { LoginRequest } from './../../../src/models/LoginRequest';
import { getAuthToken, URL } from './../../../src/services/AuthService';
import { requestInstance } from '../../../src/index';
import MockAdapter from "axios-mock-adapter";
import { assert, expect } from 'chai';
import sinon from 'sinon';

describe('AuthService', function () {

    afterEach(() => {
        sinon.restore();
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

    const RESPONSE_TOKEN: string = "token";

    describe('getAuthToken', function () {

        const requestMockInstance = new MockAdapter(requestInstance);

        it('should return JWT token in response data for a valid LoginRequest', async () => {
            
            console.log(`Setting up mock response for URL: ${URL}`);
            console.log(`Mocking response with token: ${RESPONSE_TOKEN}`);
            
            requestMockInstance.onPost(URL, VALID_LOGIN_REQUEST).reply(200, RESPONSE_TOKEN);

            try {
                const result = await getAuthToken(VALID_LOGIN_REQUEST);
                
                expect(result).to.equal(RESPONSE_TOKEN);
            } catch (error) {
                assert.fail("Expected no error");
            }
        });

        it('should throw error for an invalid LoginRequest without sending POST request', async () => {
            try {
                await getAuthToken(INVALID_LOGIN_REQUEST);
                assert.fail("Expected to catch error");
            } catch (error) {

                expect(error.message).to.equal("Invalid email or password!");
            }
        });
    });
});
