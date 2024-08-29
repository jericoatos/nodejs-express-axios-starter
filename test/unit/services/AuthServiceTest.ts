import { LoginRequest } from './../../../src/models/LoginRequest';
import { getAuthToken, URL } from './../../../src/services/AuthService';
import { requestInstance } from '../../../src/index';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import MockAdapter from "axios-mock-adapter";

describe('AuthService', function () {

    afterEach(() => {
        sinon.restore();
    });

    const VALID_EMAIL = 'validadmin@email.com';
    const VALID_PASSWORD = 'validPa$$word123!'

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
                console.log('Request payload:', VALID_LOGIN_REQUEST);
                console.log('Response:', result);
                expect(result).to.deep.equal(RESPONSE_TOKEN);
            } catch (error) {
                console.error('Error:', error);
                assert.fail("Expected no error");
            }
    
        });
    

        it('should throw error for an invalid LoginRequest without sending POST request', async () => {
            try {
                await getAuthToken(INVALID_LOGIN_REQUEST);
                assert.fail("Expected to catch error")
            } catch (error) {
                expect(error.message).to.equal("Invalid email or password!");
                return;
            }
        });
    });
});
