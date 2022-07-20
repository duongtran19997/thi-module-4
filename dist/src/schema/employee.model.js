"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const employeeSchema = new mongoose_1.default.Schema({
    name: { type: "String", maxlength: 255 },
    code: { type: "String", maxlength: 1000 },
    age: { type: "String" },
    salary: { type: "String" },
    branch: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "branch" }
});
const employeeModel = mongoose_1.default.model('employee', employeeSchema);
exports.default = employeeModel;
//# sourceMappingURL=employee.model.js.map