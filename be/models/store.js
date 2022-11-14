import { Schema } from "mongoose";
const Schema = mongoose.Schema;

const StoreSchema = new Schema (
  {
    storename: { type: String, require: true },
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