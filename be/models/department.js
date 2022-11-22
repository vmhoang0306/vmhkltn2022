import mongoose from "mongoose";
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
  departmentname: { type: String, require: true },
  isactive: { type: Boolean, require: true, default: true },
});

const IDepartment = mongoose.model("department", DepartmentSchema);
export default IDepartment;
