import mongoose from "mongoose";
const { Schema } = mongoose;

const VacationApprovalSchema = new Schema(
  {
    userapprove: { type: String, require: true },
    vacationdate: { type: Date, require: true },
    status: { type: Number, require: true },
    note: { type: String, require: true },
    createduser: { type: String, require: false },
    createddate: { type: String, require: false },
  },
  {
    timestamps: true,
  }
);

const IVacationApproval = mongoose.model(
  "hrm_vacation_approval",
  VacationApprovalSchema
);
export default IVacationApproval;
