import mongoose from "mongoose";
const { Schema } = mongoose;

const TimekeepingDetailSchema = new Schema({
  username: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "employeeinfo",
  },
  timekeeping: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "timekeeping",
  },
  ischeck: { type: Boolean, require: true },
  hour: { type: Float, require: true },
  date: { type: Number, require: true },
});

const ITimekeepingDetail = mongoose.model("timekeeping", TimekeepingDetailSchema);
export default ITimekeepingDetail;