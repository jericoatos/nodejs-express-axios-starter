import express from "express";
import session from "express-session";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import { getLoginForm, logout, postLoginForm } from "./controllers/AuthController";
import { setLoggedInStatus } from "./middleware/Authmiddleware";

const app = express();

app.use(express.static('public'));
app.set('view engine', 'html')

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.static('public'));
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
