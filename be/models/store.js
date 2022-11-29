import mongoose from "mongoose";
const { Schema } = mongoose;

const StoreSchema = new Schema(
  {
    storename: { type: String, require: true },
    manager: { type: String, require: false },
    address: { type: String, require: true },
    openingdate: { type: Date, require: true },
    taxcode: { type: String, require: true },
    isactive: { type: Boolean, require: true, default: true },
  },
  {
    timestamps: true,
  }
);

const IStore = mongoose.model("store", StoreSchema);
export default IStore;
