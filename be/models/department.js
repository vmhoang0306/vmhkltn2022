import mongoose from "mongoose";
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
  departmentname: { type: String, require: true },
  manager: { type: String, require: false },
  isactive: { type: Boolean, require: true, default: true },
});

const IDepartment = mongoose.model("mwg_department", DepartmentSchema);
export default IDepartment;
