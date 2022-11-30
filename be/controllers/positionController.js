import IPosition from "../models/position.js";

//GET ALL
export const getAllPosition = async (_req, res) => {
  await IPosition.find()
    .then((position) => {
      res
        .status(200)
        .json({ status: "success", result: position.length, data: position });
    })
    .catch((error) => res.status(400).json({ status: "error", message: error.message }));
};
