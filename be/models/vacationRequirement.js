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
