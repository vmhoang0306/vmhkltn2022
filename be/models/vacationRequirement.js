import mongoose from "mongoose";
const { Schema } = mongoose;

const VacationRequirementSchema = new Schema(
  {
    username: { type: String, require: true },
    requirementtype: { type: Number, require: true },
    fromdate: { type: Date, require: true },
    todate: { type: Date, require: true },
    status: { type: Number, require: true },
    reason: { type: String, require: true },
    createduser: { type: String, require: false },
    createddate: { type: String, require: false },
    deleteduser: { type: String, require: false },
    deleteddate: { type: String, require: false },
    approveduser: { type: String, require: false },
    approveddate: { type: String, require: false },
  },
  {
    timestamps: true,
  }
);

const IVacationRequirement = mongoose.model(
  "vacation_requirement",
  VacationRequirementSchema
);
export default IVacationRequirement;
