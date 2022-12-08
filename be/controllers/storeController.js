import IStore from "../models/store.js";

//GET ALL
export const getAllStore = async (_req, res) => {
  try {
    const store = await IStore.find();

    res.status(200).json({ status: "success", data: store });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
