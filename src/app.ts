import express from "express";
import session from "express-session";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import path from 'path';

import { getAllJobRoles, getErrorMessage, getJobRoleForm, getSingleJobRole, postJobRoleForm } from "./controllers/JobRoleController";
import { dateFilter } from "./filter/DateFilter";
import { getloginErrorMessage, getLoginForm, logout, postLoginForm } from "./controllers/AuthController";
import { allowRoles, setLoggedInStatus } from "./middleware/AuthMiddleware";
import { UserRole } from "./models/JwtToken";

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

app.get('/', async (req: express.Request, res: express.Response) => {
  res.render("home.html");
});

app.get('/job-roles', allowRoles([UserRole.Admin, UserRole.User]), getAllJobRoles);

app.get('/', async (req: express.Request, res: express.Response) => {
  res.render("home.html");
});


app.get('/job-roles', getAllJobRoles);
app.get('/job-roles/:id', getSingleJobRole);
//app.post('/job-roles',postJobRoleForm);
app.get('/job-role-form',getJobRoleForm);
app.post('/job-role-form', postJobRoleForm);
app.get('/job-roles/:id', allowRoles([UserRole.Admin, UserRole.User]), getSingleJobRole);

app.get('/error', getErrorMessage);