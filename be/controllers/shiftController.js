import IShift from "../models/shift.js";
import { mongooseHelper, dataHelper } from "../utils/_helper.js";

//GET ALL
export const getAllShiftType = async (_req, res) => {
  await IShift.find()
    .then((shift) => {
      shift = mongooseHelper.ToList(shift);
      res
        .status(200)
        .json({ status: "success", result: shift.length, data: shift });
    })
    .catch((error) => res.status(400).json({ message: error.message }));
};
