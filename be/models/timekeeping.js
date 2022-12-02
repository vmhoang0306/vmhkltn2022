import mongoose from "mongoose";
const { Schema } = mongoose;

const TimekeepingSchema = new Schema(
  {
    username: { type: String, require: true },
    ischeck: { type: Boolean, require: true },
    hour: { type: Float, require: true },
    date: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

const ITimekeeping = mongoose.model("timekeeping", TimekeepingSchema);
export default ITimekeeping;
