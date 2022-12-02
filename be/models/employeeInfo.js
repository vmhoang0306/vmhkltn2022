import mongoose from "mongoose";
const { Schema } = mongoose;

const EmployeeInfoSchema = new Schema(
  {
    username: { type: String, require: true },
    fullname: { type: String, require: true },
    contact: {
      email: { type: String, require: false },
      phonenumber: { type: String, require: true },
    },
    dateofbirth: { type: Date, require: true },
    sex: { type: Number, require: true },
    identitycardid: { type: String, require: true },
    socialinsuranceid: { type: String, require: false },
    startdatework: { type: Date, require: false },
    enddatework: { type: Date, require: false },
    reason: { type: String, require: false },
    salary: { type: Number, require: true },
    store: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "store",
    },
    department: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "department",
    },
    shift: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "shift",
    },
    position: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "position",
    },
    taxcode: { type: String, require: false },
    password: { type: String, require: true },
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

const IEmployeeInfo = mongoose.model("employeeinfo", EmployeeInfoSchema);
export default IEmployeeInfo;
