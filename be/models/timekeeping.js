import mongoose from "mongoose";
const { Schema } = mongoose;

const TimekeepingSchema = new Schema(
  {
    atmonth: { type: Number, require: true },
    atyear: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

const ITimekeeping = mongoose.model("mwg_timekeeping", TimekeepingSchema);
export default ITimekeeping;
