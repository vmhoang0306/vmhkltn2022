import IPosition from "../models/position.js";

//GET ALL
export const getAllPosition = async (_req, res) => {
  try {
    const position = await IPosition.find();

    res.status(200).json({ status: "success", data: position });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
