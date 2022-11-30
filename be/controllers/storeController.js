import IStore from "../models/store.js";

//GET ALL
export const getAllPosition = async (_req, res) => {
  await IStore.find()
    .then((store) => {
      res
        .status(200)
        .json({ status: "success", result: store.length, data: store });
    })
    .catch((error) => res.status(400).json({ status: "error", message: error.message }));
};