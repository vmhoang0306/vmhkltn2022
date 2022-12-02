import mongoose from "mongoose";
const { Schema } = mongoose;

const TransferApprovalSchema = new Schema(
  {
    transferreport: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "transfer_report",
    },
    status: { type: Number, require: true },
    note: { type: String, require: true },
    approveduser: { type: String, require: false },
    approveddate: { type: String, require: false },
  },
  {
    timestamps: true,
  }
);

const ITransferApproval = mongoose.model("transfer_approvals", TransferApprovalSchema);
export default ITransferApproval;
