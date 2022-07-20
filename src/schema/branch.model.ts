import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
   branchName:String
});
const branchModel = mongoose.model('branch',branchSchema);

export default branchModel