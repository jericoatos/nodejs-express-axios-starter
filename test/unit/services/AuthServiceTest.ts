import { LoginRequest } from './../../../src/models/LoginRequest';
import { getAuthToken, URL } from './../../../src/services/AuthService';
import { requestInstance } from '../../../src/index';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import sinon from 'sinon';

describe('AuthService', function () {

    afterEach(() => {
        sinon.restore();
    });

    const VALID_EMAIL = process.env.VALID_TEST_EMAIL || '';
    const VALID_PASSWORD = process.env.VALID_TEST_PASSWORD || '';

    const VALID_LOGIN_REQUEST: LoginRequest = {
        email: VALID_EMAIL,
        password: VALID_PASSWORD
    };

    const INVALID_LOGIN_REQUEST: LoginRequest = {
        email: 'invalid',
        password: 'invalid'
    };

    const RESPONSE_TOKEN: string = "mock.token.response";

    describe('getAuthToken', function () {

        const requestMockInstance = new MockAdapter(requestInstance);

        it('should return JWT token in response data for a valid LoginRequest', async () => {
            const data = { token: RESPONSE_TOKEN };

            requestMockInstance.onPost(URL, VALID_LOGIN_REQUEST).reply(200, data);

            try {
                console.log('Testing with:', VALID_LOGIN_REQUEST); // Debugging statement
                const result = await getAuthToken(VALID_LOGIN_REQUEST);
                console.log('Result:', result); // Debugging statement
                expect(result).to.deep.equal(RESPONSE_TOKEN);
            } catch (error) {
                console.error('Error:', error); // Debugging statement
                expect.fail("Expected no error but received one");
            }
        });

        it('should throw error for an invalid LoginRequest', async () => {
            requestMockInstance.onPost(URL, INVALID_LOGIN_REQUEST).reply(400, {
                message: "Invalid email or password!"
            });

            try {
                await getAuthToken(INVALID_LOGIN_REQUEST);
                expect.fail("Expected to catch error");
            } catch (error) {
                console.error('Error:', error); // Debugging statement
                expect(error.message).to.equal("Invalid email or password!");
            }
        });
    });
});

