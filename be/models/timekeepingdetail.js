import { Schema } from "mongoose";
const Schema = mongoose.Schema;

const TimekeepingDetailSchema = new Schema ({
  username: { type: mongoose.Types.ObjectId, required: true, ref: "hrm_employeeinfo", index },
  atmonth: { type: mongoose.Types.ObjectId, require: true, ref: "mwg_timekeeping" },
  atyear: { type: mongoose.Types.ObjectId, require: true, ref: "mwg_timekeeping" },
  ischeck: { type: Boolean, require: true },
  hour: { type: Float, require: true },
});