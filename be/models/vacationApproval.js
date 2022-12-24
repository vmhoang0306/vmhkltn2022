import mongoose from "mongoose";
const { Schema } = mongoose;

const VacationApprovalSchema = new Schema(
  {
    vacation_requirement: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "vacation_requirement",
    },
    status: { type: Number, require: true },
    note: { type: String, require: true },
    approveduser: { type: String, require: false },
    approveddate: { type: Date, require: false },
  },
  {
    timestamps: true,
  }
);

const IVacationApproval = mongoose.model(
  "vacation_approval",
  VacationApprovalSchema
);
export default IVacationApproval;
 