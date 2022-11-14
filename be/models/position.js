import { Schema } from "mongoose";
const Schema = mongoose.Schema;

const PositionSchema = new Schema (
  {
    positionname: { type: String, require: true },
    description: { type: String, require: true },
  }
);

const IPosition = mongoose.model("mwg_store", PositionSchema);
export default IPosition;