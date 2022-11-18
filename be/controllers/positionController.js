import IPosition from "../models/position.js";
import { mongooseHelper } from "../utils/_helper.js";

//GET ALL
export const getAllPosition = async (_req, res) => {
  await IPosition.find()
    .then((position) => {
      position = mongooseHelper.ToList(position);
      res
        .status(200)
        .json({ status: "success", result: position.length, data: shift });
    })
    .catch((error) => res.status(400).json({ message: error.message }));
};