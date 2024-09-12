import { afterEach, describe, it } from 'node:test';
import * as QuizController from '../../../src/controllers/QuizController'; // Update the path
import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';

describe('QuizController', function () {

    afterEach(() => {
        sinon.restore();
    });

    describe('getQuestionOne', function () {
        it('should render questionOne view', async () => {
            const req = {} as Request;
            const res = {
                render: sinon.spy()
            } as unknown as Response;

            await QuizController.getQuestionOne(req, res);

            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('quiz/questionOne')).to.be.true;
        });
    });

    describe('getQuestionTwo', function () {
        it('should render questionTwo view', async () => {
            const req = {} as Request;
            const res = {
                render: sinon.spy()
            } as unknown as Response;

            await QuizController.getQuestionTwo(req, res);

            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('quiz/questionTwo')).to.be.true;
        });
    });

    describe('getQuestionThree', function () {
        it('should render questionThree view', async () => {
            const req = {} as Request;
            const res = {
                render: sinon.spy()
            } as unknown as Response;

            await QuizController.getQuestionThree(req, res);

            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('quiz/questionThree')).to.be.true;
        });
    });

    describe('getQuestionFour', function () {
        it('should render questionFour view', async () => {
            const req = {} as Request;
            const res = {
                render: sinon.spy()
            } as unknown as Response;

            await QuizController.getQuestionFour(req, res);

            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('quiz/questionFour')).to.be.true;
        });
    });

    describe('getQuestionFive', function () {
        it('should render questionFive view', async () => {
            const req = {} as Request;
            const res = {
                render: sinon.spy()
            } as unknown as Response;

            await QuizController.getQuestionFive(req, res);

            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('quiz/questionFive')).to.be.true;
        });
    });

    describe('getResultJob', function () {
        it('should render resultJob view', async () => {
            const req = {} as Request;
            const res = {
                render: sinon.spy()
            } as unknown as Response;

            await QuizController.getResultJob(req, res);

            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('resultJob')).to.be.true;
        });
    });

    describe('getAnswers', function () {
        it('should render checkAnswers view with API key', async () => {
            const mykey = 'test-api-key';
            process.env.OPENAI_API_KEY = mykey;
            const req = {} as Request;
            const res = {
                render: sinon.spy()
            } as unknown as Response;

            await QuizController.getAnswers(req, res);

            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('checkAnswers', { apiKey: mykey })).to.be.true;
        });
    });

    describe('getQuiz', function () {
        it('should render quiz view', async () => {
            const req = {} as Request;
            const res = {
                render: sinon.spy()
            } as unknown as Response;

            await QuizController.getQuiz(req, res);

            expect((res.render as sinon.SinonSpy).calledOnce).to.be.true;
            expect((res.render as sinon.SinonSpy).calledWith('quiz')).to.be.true;
        });
    });

});