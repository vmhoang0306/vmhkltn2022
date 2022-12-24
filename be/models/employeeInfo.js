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
    gender: { type: Number, require: true },
    identitycardid: { type: String, require: true },
    socialinsuranceid: { type: String, require: false },
    startdatework: { type: Date, require: false },
    enddatework: { type: Date, require: false },
    reason: { type: String, require: false },
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
  },
  {
    timestamps: true,
  }
);

const IEmployeeInfo = mongoose.model("employeeinfo", EmployeeInfoSchema);
export default IEmployeeInfo;
