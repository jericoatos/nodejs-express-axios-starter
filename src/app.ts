import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import path from 'path';

import { getAllJobRoles, getSingleJobRole } from "./controllers/JobRoleController";
import { dateFilter } from "./filter/DateFilter";

const app = express();

app.use(express.static('public'));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html')


nunjucks.configure('views', {
autoescape: true,
express: app
});


const env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

env.addFilter('date', dateFilter);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(session({ secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 }}));

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
});


app.get('/', async (req: express.Request, res: express.Response) => {
  res.render("home.html");
});

app.get('/job-roles', getAllJobRoles);
app.get('/job-roles/:id', getSingleJobRole);


