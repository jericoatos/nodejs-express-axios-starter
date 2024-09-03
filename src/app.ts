import express from "express";
import session from "express-session";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import path from 'path';

import { getAllJobRoles } from "./controllers/JobRoleController";
import { dateFilter } from "./filter/DateFilter";
import { getLoginForm, logout, postLoginForm } from "./controllers/AuthController";
import { setLoggedInStatus } from "./middleware/AuthMiddleware";

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

app.get('/', async (req: express.Request, res: express.Response) => {
  res.render("home.html");
});


app.get('/', async (req: express.Request, res: express.Response) => {
  res.render("home.html");
});

app.get('/job-roles', getAllJobRoles);
