import express from "express";
import session from "express-session";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import path from 'path';

import { getAllJobRoles, getErrorMessage, getJobRoleForm, getSingleJobRole, postJobRoleForm } from "./controllers/JobRoleController";
import { dateFilter } from "./filter/DateFilter";
import { getloginErrorMessage, getLoginForm, getNonAuthorizedMessage, logout, postLoginForm } from "./controllers/AuthController";
import { allowRoles, setLoggedInStatus } from "./middleware/AuthMiddleware";
import { UserRole } from "./models/JwtToken";
import { getAnswers, getQuestionFive, getQuestionFour, getQuestionOne, getQuestionThree, getQuestionTwo, getQuiz, getResultJob } from "./controllers/QuizController";

const app = express();

app.use(express.static('public'));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html')

app.use(express.static('public'));
app.set('view engine', 'html')

nunjucks.configure('views', {
  autoescape: true,
  express: app
});


const env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.static('public'));
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

env.addFilter('date', dateFilter);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(session({ secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 } }));
app.use(setLoggedInStatus);

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.listen(3000, () => {
  console.log('Server started on port 3000');

});

app.get('/loginForm', getLoginForm);
app.post('/loginForm', postLoginForm);

app.get('/logout', logout)
app.get('/loginErrorMessage', getloginErrorMessage )
app.get('/nonAuthorizedError', getNonAuthorizedMessage)

app.get('/', async (req: express.Request, res: express.Response) => {
  res.render("home.html");
});

app.get('/job-roles', allowRoles([UserRole.Admin, UserRole.User]), getAllJobRoles);

app.get('/', async (req: express.Request, res: express.Response) => {
  res.render("home.html");
});


app.get('/job-roles', getAllJobRoles);
app.get('/job-role-form',allowRoles([UserRole.Admin]), getJobRoleForm);
app.post('/job-role-form',allowRoles([UserRole.Admin]), postJobRoleForm);
app.get('/job-roles/:id', allowRoles([UserRole.Admin, UserRole.User]), getSingleJobRole);
app.get('/error', getErrorMessage);

app.get('/questionOne', getQuestionOne);
app.get('/questionTwo', getQuestionTwo);
app.get('/questionThree', getQuestionThree);
app.get('/questionFour', getQuestionFour);
app.get('/questionFive', getQuestionFive);
app.get('/resultJob', getResultJob);
app.get('/checkAnswers', getAnswers);
app.get('/quiz', getQuiz);