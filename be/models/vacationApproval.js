import mongoose from "mongoose";
const { Schema } = mongoose;

const VacationApprovalSchema = new Schema(
  {
    vacationrequirement: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "department",
    },
    vacationdate: { type: Date, require: true },
    status: { type: Number, require: true },
    note: { type: String, require: true },
    approveduser: { type: String, require: false },
    approveddate: { type: String, require: false },
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
 