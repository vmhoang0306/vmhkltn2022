import IShift from "../models/shift.js";

//GET ALL
export const getAllShiftType = async (_req, res) => {
  await IShift.find()
    .then((shift) => {
      res
        .status(200)
        .json({ status: "success", result: shift.length, data: shift });
    })
    .catch((error) => res.status(400).json({ status: "error", message: error.message }));
};
