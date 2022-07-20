import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {type: "String", maxlength: 255},
    code: {type: "String", maxlength: 1000},
    age: {type: "String" },
    salary: {type: "String"},
    branch: {type: mongoose.Schema.Types.ObjectId, ref: "branch"}
});

const employeeModel = mongoose.model('employee', employeeSchema);

export default employeeModel;