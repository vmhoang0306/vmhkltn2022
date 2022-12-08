import IShift from "../models/shift.js";

//GET ALL
export const getAllShiftType = async (_req, res) => {
  try {
    const shift = await IShift.find();

    res.status(200).json({ status: "success", data: shift });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
