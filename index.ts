import mongoose from 'mongoose';
import express from 'express';
import bodyParser from "body-parser";
import branchModel from "./src/schema/branch.model";
import employeeModel from "./src/schema/employee.model";
const app = express();
const PORT = 3000;
const DB_URL = "mongodb+srv://root:Password@cluster0.l1wd2.mongodb.net/module-4?retryWrites=true&w=majority"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './src/views');

mongoose.connect((DB_URL)).then(()=>{
    console.log(`DB is connected`)}).catch(err=>{
    console.log('DB is not connected')
});

app.get('/create', async(req, res) => {
    const branch = await branchModel.find();
    // console.log(branch)
    res.render('createEmployee',{branch});
});
app.post('/create', async(req, res)=>{
    console.log(req.body.branch);
    const employee = new employeeModel({name:req.body.name,
                                                code:req.body.code,
                                                age:req.body.age,
                                                salary:req.body.salary,
                                                branch:req.body.branch});

    await employee.save()
    res.redirect('/employees')
});

app.get('/employees',async (req, res) =>{
    const employees = await employeeModel.find().populate('branch')
    console.log(employees[0].branch['branchName']);
    res.render('employees',{employees})
})

app.get('/delete:id',(req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    res.render('confirmDelete',{id})
});

app.post('/delete',async(req, res) => {
    await employeeModel.findOneAndDelete(req.body.id);
    res.redirect('/employees')
});

app.get('/edit:id',async(req, res) => {
    const id = req.params.id;
    const employee =await employeeModel.findOne({id}).populate('branch');
    const branch = await branchModel.find();
    console.log(employee);
    res.render('edit', {employee,branch})
});

app.get('/info:id',async(req, res) => {
    const id = req.params.id;
    const employee = await employeeModel.findOne({id}).populate('branch')
    console.log(employee);
    res.render('info',{employee})
})

app.post('/edit',async(req, res) => {
    await employeeModel.findOneAndUpdate({_id:req.body.id},{
        name:req.body.name,
        code:req.body.code,
        age:req.body.age,
        salary:req.body.salary,
        branch:req.body.branch
    });
    res.redirect('/employees');
})


app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});