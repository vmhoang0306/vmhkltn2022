import mongoose from "mongoose";
const { Schema } = mongoose;

const TransferReportSchema = new Schema(
  {
    username: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "employeeinfo",
    },
    currentdepartment: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "department",
    },
    newdepartment: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "department",
    },
    reason: { type: String, require: true },
    status: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

const ITransferReport = mongoose.model("transfer_report", TransferReportSchema);
export default ITransferReport;
