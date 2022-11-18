import IStore from "../models/store.js";
import { mongooseHelper } from "../utils/_helper.js";

//GET ALL
export const getAllPosition = async (_req, res) => {
  await IStore.find()
    .then((store) => {
      store = mongooseHelper.ToList(store);
      res
        .status(200)
        .json({ status: "success", result: store.length, data: shift });
    })
    .catch((error) => res.status(400).json({ message: error.message }));
};