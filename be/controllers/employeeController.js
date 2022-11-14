import IEmployeeInfo from "../models/employeeInfo.js";

export const getAllEmployeeInfo = async (req, res) => {
  try {
    const listEmployeeInfo = await IEmployeeInfo.find();

    res.status(200).json(listEmployeeInfo);
  } catch (err) {
    res.status(404).json({message: err.message})
  }
};