//mport { validateJobRoleForm } from './JobRoleFormValidator';
import { expect } from 'chai';
import { JobRoleRequest } from '../../../src/models/JobRoleRequest';
import { validateJobRoleForm } from '../../../src/validators/JobRoleFormValidator';
//import { JobRoleRequest } from "../models/JobRoleRequest";

describe('JobRoleFormValidator', function () {
    describe('validateJobRoleForm', function () {

        const validJobRole: JobRoleRequest = {
            roleName: 'Software Engineer',
            description: 'Writing code and working with others during sprints!',
            sharepointUrl: 'https://valid-url.com',
            responsibilities: 'Code, test, teamwork!',
            numberOfOpenPositions: 5,
            location: 'Derry',
            closingDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), // Future date
            bandId: 3,
            capabilityId: 1,
            statusName: 'Open'
        };

        it('should not throw an error for a valid job role', () => {
            try {
                validateJobRoleForm(validJobRole);
            } catch (e) {
                expect.fail('Expected no error but got: ' + e.message);
            }
        });

        it('should return error when Job Role Name is missing', () => {
            const jobRole = { ...validJobRole, roleName: '' };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal("Job Role Name is required.");
                return;
            }
            expect.fail("Expected error message");
        });

        it('should return error when Job Role Name is too short', () => {
            const jobRole = { ...validJobRole, roleName: 'Dev' };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal("Job Role name is too short.");
                return;
            }
            expect.fail("Expected error message");
        });

        it('should return error when Job Role Name is too long', () => {
            const jobRole = { ...validJobRole, roleName: 'A'.repeat(51) };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal('Job Role name is too long.');
                return;
            }
            expect.fail("Expected error message");
        });

        it('should return error when Job Role Name contains numbers or special characters', () => {
            const jobRole = { ...validJobRole, roleName: 'Meg123' };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal('Job Role name can only contain letters and spaces.');
                return;
            }
            expect.fail("Expected error message");
        });

        it('should return error when Description contains invalid characters', () => {
            const jobRole = { ...validJobRole, description: 'Working @ Kainos!' };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal('Job Spec Summary can only contain letters, spaces, full stops, commas, exclamation marks, question marks, and quotation marks.');
                return;
            }
            expect.fail("Expected error message");
        });

        it('should return error when Responsibilities contain invalid characters', () => {
            const jobRole = { ...validJobRole, responsibilities: 'Working with other$!' };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal('Responsibilities can only contain letters, spaces, full stops, commas, exclamation marks, question marks, and quotation marks.');
                return;
            }
            expect.fail("Expected error message");
        });

        it('should return error when Number of Open Positions is not a number', () => {
            const jobRole = { ...validJobRole, numberOfOpenPositions: NaN };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal('Number of Open Positions must be a valid number.');
                return;
            }
            expect.fail("Expected error message");
        });

        it('should return error when Number of Open Positions is less than or equal to 0', () => {
            const jobRole = { ...validJobRole, numberOfOpenPositions: -1 };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal('Number of Open Positions must be greater than 0.');
                return;
            }
            expect.fail("Expected error message");
        });

        it('should return error when Location hasnt been entered', () => {
            const jobRole = { ...validJobRole, location: '' };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal("Location is required.");
                return;
            }
            expect.fail("Expected error message");
        });

        it('should return error when Location contains invalid characters', () => {
            const jobRole = { ...validJobRole, location: 'N3w York!' };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal('Job Role location can only contain letters and spaces.');
                return;
            }
            expect.fail("Expected error message");
        });

        it('should return error when Closing Date hasnt been', () => {
            const jobRole = { ...validJobRole, closingDate: '' };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal("Closing date is required.");
                return;
            }
            expect.fail("Expected error message");
        });

        it('should return error when Closing Date is in the past', () => {
            const pastDate = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();
            const jobRole = { ...validJobRole, closingDate: pastDate };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal("Closing date cannot be in the past.");
                return;
            }
            expect.fail("Expected error message");
        });

        it('should return error when Band Id is not entered', () => {
            const jobRole = { ...validJobRole, bandId: undefined as any };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal("Band Name is required.");
                return;
            }
            expect.fail("Expected error message");
        });

        it('should return error when Capability Id is not entered', () => {
            const jobRole = { ...validJobRole, capabilityId: undefined as any };
            try {
                validateJobRoleForm(jobRole);
            } catch (e) {
                expect(e.message).to.equal("Capability Name is required.");
                return;
            }
            expect.fail("Expected error message");
        });

    });
});
