"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const branch_model_1 = __importDefault(require("./src/schema/branch.model"));
const employee_model_1 = __importDefault(require("./src/schema/employee.model"));
const app = (0, express_1.default)();
const PORT = 3000;
const DB_URL = "mongodb+srv://root:Password@cluster0.l1wd2.mongodb.net/module-4?retryWrites=true&w=majority";
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './src/views');
mongoose_1.default.connect((DB_URL)).then(() => {
    console.log(`DB is connected`);
}).catch(err => {
    console.log('DB is not connected');
});
app.get('/create', async (req, res) => {
    const branch = await branch_model_1.default.find();
    res.render('createEmployee', { branch });
});
app.post('/create', async (req, res) => {
    console.log(req.body.branch);
    const employee = new employee_model_1.default({ name: req.body.name,
        code: req.body.code,
        age: req.body.age,
        salary: req.body.salary,
        branch: req.body.branch });
    await employee.save();
    res.redirect('/employees');
});
app.get('/employees', async (req, res) => {
    const employees = await employee_model_1.default.find().populate('branch');
    console.log(employees[0].branch['branchName']);
    res.render('employees', { employees });
});
app.get('/delete:id', (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    res.render('confirmDelete', { id });
});
app.post('/delete', async (req, res) => {
    await employee_model_1.default.findOneAndDelete(req.body.id);
    res.redirect('/employees');
});
app.get('/edit:id', async (req, res) => {
    const id = req.params.id;
    const employee = await employee_model_1.default.findOne({ id }).populate('branch');
    const branch = await branch_model_1.default.find();
    console.log(employee);
    res.render('edit', { employee, branch });
});
app.get('/info:id', async (req, res) => {
    const id = req.params.id;
    const employee = await employee_model_1.default.findOne({ id }).populate('branch');
    console.log(employee);
    res.render('info', { employee });
});
app.post('/edit', async (req, res) => {
    await employee_model_1.default.findOneAndUpdate({ _id: req.body.id }, {
        name: req.body.name,
        code: req.body.code,
        age: req.body.age,
        salary: req.body.salary,
        branch: req.body.branch
    });
    res.redirect('/employees');
});
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map