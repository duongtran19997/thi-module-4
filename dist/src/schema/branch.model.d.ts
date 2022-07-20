import mongoose from "mongoose";
declare const branchModel: mongoose.Model<{
    branchName?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    branchName?: string;
}>>;
export default branchModel;
