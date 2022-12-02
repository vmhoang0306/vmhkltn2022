import mongoose from "mongoose";
const { Schema } = mongoose;

const PositionSchema = new Schema({
  positionname: { type: String, require: true },
  description: { type: String, require: true },
});

const IPosition = mongoose.model("position", PositionSchema);
export default IPosition;
