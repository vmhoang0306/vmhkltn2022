import mongoose from "mongoose";
const { Schema } = mongoose;

const TimekeepingSchema = new Schema(
  {
    username: { type: String, require: true },
    ischeck: { type: Boolean, require: true },
    hour: { type: Number, require: true },
    date: { type: Date, require: true },
  },
  {
    timestamps: true,
  }
);

const ITimekeeping = mongoose.model("timekeeping", TimekeepingSchema);
export default ITimekeeping;
