import mongoose from "mongoose";
declare const employeeModel: mongoose.Model<{
    name?: string;
    code?: string;
    age?: string;
    salary?: string;
    branch?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    name?: string;
    code?: string;
    age?: string;
    salary?: string;
    branch?: mongoose.Types.ObjectId;
}>>;
export default employeeModel;
