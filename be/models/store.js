import mongoose from "mongoose";
const { Schema } = mongoose;

const StoreSchema = new Schema(
  {
    storename: { type: String, require: true },
    isactive: { type: Boolean, require: true, default: true },
  },
  {
    timestamps: true,
  }
);

const IStore = mongoose.model("store", StoreSchema);
export default IStore;
