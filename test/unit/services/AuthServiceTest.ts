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
    console.log(`Valid email: ${VALID_EMAIL}`);  // Debugging line
    console.log(`Valid password: ${VALID_PASSWORD}`);  // Debugging line

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
                console.log(`Auth token received: ${result}`);  // Debugging line
                expect(result).to.deep.equal(RESPONSE_TOKEN);
            } catch (error) {
                console.error("Error occurred: ", error); 
                assert.fail("Expected no error");
            }
        });

        it('should throw error for an invalid LoginRequest without sending POST request', async () => {
            try {
                await getAuthToken(INVALID_LOGIN_REQUEST);
                assert.fail("Expected to catch error");
            } catch (error) {
                console.log("Caught error as expected: ", error);  // Debugging line
                expect(error.message).to.equal("Invalid email or password!");
                return;
            }
        });
    });
});
