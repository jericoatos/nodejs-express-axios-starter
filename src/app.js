"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const TestController_1 = require("../dist/src/controllers/TestController");
const JobRoleController_1 = require("../dist/src/controllers/JobRoleController");
const DateFilter_1 = require("../dist/src/filter/DateFilter");
const app = (0, express_1.default)();
const env = nunjucks_1.default.configure('views', {
    autoescape: true,
    express: app
});
env.addFilter('date', DateFilter_1.dateFilter);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use((0, express_session_1.default)({ secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 } }));
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
app.get('/', TestController_1.getAllDatabases);
app.get('/job-roles', JobRoleController_1.getAllJobRoles);
//# sourceMappingURL=app.js.map