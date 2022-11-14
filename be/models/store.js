import mongoose from "mongoose";
const { Schema } = mongoose;

const StoreSchema = new Schema(
  {
    storename: { type: String, require: true },
    manager: { type: String, require: false },
    storeadress: { type: String, require: true },
    openingdate: { type: Date, require: true },
    taxcode: { type: String, require: true },
    isactive: { type: Boolean, require: true, default: true },
  },
  {
    timestamps: true,
  }
);

const IStore = mongoose.model("mwg_store", StoreSchema);
export default IStore;
