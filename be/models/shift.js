import mongoose from "mongoose";
const { Schema } = mongoose;

const ShiftSchema = new Schema({
  shiftname: { type: String, require: true },
  description: { type: String, require: true },
});

const IShift = mongoose.model("shift", ShiftSchema);
export default IShift;
