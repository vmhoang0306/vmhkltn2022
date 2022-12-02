import IEmployeeInfo from "../models/employeeInfo.js";
import IDepartment from "../models/department.js";
import IShift from "../models/shift.js";
import IPosition from "../models/position.js";
import IStore from "../models/store.js";

//GET ALL
export const getAllEmployeeInfo = async (req, res) => {
  try {
    const listEmployeeInfo = await IEmployeeInfo.find();

    res.status(200).json({ status: "success", data: listEmployeeInfo });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

//GET BY ID
export const getInfoById = async (req, res) => {
  const username = req.query.username;

  try {
    const info = await IEmployeeInfo.findOne({ username: username })
      .populate("department")
      .populate("store")
      .populate("position")
      .populate("shift");
    if (info === null || info.length === 0) {
      return res.status(200).json({
        status: "error",
        message: "Không tìm thấy thông tin của người dùng!",
      });
    }

    res.status(200).json({
      status: "success",
      data: info,
      message: "Thông tin nhân viên " + username,
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};

export const findByKeySearch = async (req, res) => {
  const keysearch = req.query.keysearch;

  try {
    const results = await IEmployeeInfo.find({
      $or: [
        { username: { $regex: keysearch, $options: "$i" } },
        { fullname: { $regex: keysearch, $options: "$i" } },
      ],
    })
      .populate("department")
      .populate("store")
      .populate("position")
      .populate("shift");

    res.status(200).json({
      status: "success",
      data: results,
      message: "",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};

//CREATE
export const createEmployeeInfo = async (req, res) => {
  try {
    const {
      career: { careerName, icon, total },
    } = req.body;
    const newEmloyeeInfo = new IEmployeeInfo({
      career: { careerName, icon, total },
    });

    await newEmloyeeInfo.save();
    res.json({ msg: "Created a employee infomation!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//DELETE
export const deleteEmployeeInfo = async (req, res) => {
  try {
    await IEmployeeInfo.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted a employee infomation!" });
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};

//UPDATE
export const updateEmployeeInfo = async (req, res) => {
  try {
    const {
      career: { careerName, icon, total },
    } = req.body;

    await IEmployeeInfo.findOneAndUpdate(
      { _id: req.params.id },
      {
        career: { careerName, icon, total },
      }
    );

    res.json({ msg: "Updated a employee infomation!" });
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};
