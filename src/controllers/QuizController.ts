import express from "express"; 

export const getQuestionOne = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('quiz/questionOne');
}

export const getQuestionTwo = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('quiz/questionTwo');
}

export const getQuestionThree = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('quiz/questionThree');
}

export const getQuestionFour = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('quiz/questionFour');
}

export const getQuestionFive = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('quiz/questionFive');
}

export const getResultJob = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('resultJob');
}

export const getAnswers = async (req: express.Request, res: express.Response): Promise<void> => {
    const mykey = process.env.OPENAI_API_KEY;
    res.render('checkAnswers', {apiKey: mykey});
}

export const getQuiz = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('quiz');
}
