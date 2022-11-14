import mongoose from "mongoose";
const { Schema } = mongoose;

const TimekeepingDetailSchema = new Schema({
  username: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "hrm_employeeinfo",
  },
  atmonth: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "mwg_timekeeping",
  },
  atyear: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "mwg_timekeeping",
  },
  ischeck: { type: Boolean, require: true },
  hour: { type: Float, require: true },
});
