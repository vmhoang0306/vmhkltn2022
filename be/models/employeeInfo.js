import { Schema } from "mongoose";
const Schema = mongoose.Schema;

const EmployeeInfoSchema = new Schema(
  {
    username: { type: String, require: true },
    fullname: { type: String, require: true },
    contact: {
      email: { type: String, require: false },
      phonenumber: { type: String, require: true},
    },
    dateofbirth: { type: String, require: true },
    identitycardid: { type: String, require: true },
    socialinsuranceid: { type: String, require: false },
    startdatework: { type: Date, require: false },
    enddatework: { type: Date, require: false },
    salary: { type: Number, require: true },
    storeid: { type: Number, require: true },
    deparmentid: { type: Number, require: true },
    shiftid: { type: Number, require: true },
    taxcode: { type: String, require: false },
    passwork: { type: String, require: true },
    isactive: { type: Boolean, require: true, default: true },
    createduser: { type: String, require: false },
    createddate: { type: String, require: false },
    updateduser: { type: String, require: false },
    updateddate: { type: String, require: false },
    deleteduser: { type: String, require: false },
    deleteddate: { type: String, require: false },
  },
  {
    timestamps: true,
  }
);

const IEmployeeInfo = mongoose.model("hrm_employeeinfo", EmployeeInfoSchema);
export default IEmployeeInfo;