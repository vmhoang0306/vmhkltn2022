import IDepartment from "../models/department";

//GET ALL
export const getAllDepartment = async (_req, res) => {
  try {
    const listDepartment = await IDepartment.find();

    res.status(200).json({ status: "success", data: listDepartment, result: listDepartment.length });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
