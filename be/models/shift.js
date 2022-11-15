import mongoose from "mongoose";
const { Schema } = mongoose;

const ShiftSchema = new Schema({
  shiftname: { type: String, require: true },
  isactive: { type: Boolean, require: true, default: true },
});

const IShift = mongoose.model("hrm_shift", ShiftSchema);
export default IShift;
