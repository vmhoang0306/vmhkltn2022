import IEmployeeInfo from "../models/employeeInfo.js";
import IDepartment from "../models/department.js";
import IShift from "../models/shift.js";
import IPosition from "../models/position.js";
import IStore from "../models/store.js";

//GET ALL
export const getAllEmployeeInfo = async (req, res) => {
  try {
    const listEmployeeInfo = await IEmployeeInfo.find().sort({ date: -1 });

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
      .populate("shift")  ;

    res.status(200).json({
      status: "success",
      data: results,
      message: "",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};

export const searchList = async (req, res) => {
  const params = req.query;

  let conditions = [];
  if (params.keysearch !== undefined && params.keysearch.length > 0) {
    conditions.push({
      $or: [
        { username: { $regex: params.keysearch, $options: "$i" } },
        { fullname: { $regex: params.keysearch, $options: "$i" } },
      ],
    });
  }
  if (params.department !== undefined && params.department.length > 0) {
    conditions.push({ department: params.department });
  }
  if (params.store !== undefined && params.store.length > 0) {
    conditions.push({ store: params.store });
  }
  if (params.shift !== undefined && params.shift.length > 0) {
    conditions.push({ shift: params.shift });
  }
  if (params.isactive !== undefined && params.isactive.length > 0) {
    conditions.push({ isactive: params.isactive });
  }

  try {
    const results = await IEmployeeInfo.find(
      conditions.length > 0 ? { $and: conditions } : {}
    )
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
      username,
      fullname,
      password,
      contact,
      gender,
      dateofbirth,
      identitycardid,
      socialinsuranceid,
      startdatework,
      enddatework,
      reason,
      taxcode,
      salary,
      isactive,
      department,
      position,
      store,
      shift,
    } = req.body;
    const newEmloyeeInfo = new IEmployeeInfo({
      username,
      fullname,
      password,
      contact,
      gender,
      dateofbirth,
      identitycardid,
      socialinsuranceid,
      startdatework,
      enddatework,
      reason,
      taxcode,
      salary,
      isactive,
      department,
      position,
      store,
      shift,
    });

    if (username === undefined || username?.length === 0) {
      return res.status(200).json({
        data: 0,
        status: "error",
        message: "Không được để trống username!",
      });
    }

    const info = await IEmployeeInfo.findOne({ username: username });
    if (info === null || info.length === 0) {
      await newEmloyeeInfo.save();
    } else {
      return res
        .status(200)
        .json({ data: 0, status: "error", message: "Username đã tồn tại!" });
    }

    res.status(200).json({
      data: 1,
      status: "success",
      message: "Thêm thông tin người dùng thành công!",
    });
  } catch (e) {
    return res
      .status(500)
      .json({ data: -1, status: "error", message: e.message });
  }
};

//DELETE
export const deleteEmployeeInfo = async (req, res) => {
  try {
    const { _id } = req.body;
    await IEmployeeInfo.findOneAndUpdate({ _id: _id }, { isactive: false });

    res.status(200).json({
      data: 1,
      status: "success",
      message: "Xóa thông tin người dùng thành công!",
    });
  } catch (e) {
    return res
      .status(500)
      .json({ data: -1, status: "error", message: e.message });
  }
};

//RESTORE
export const restoreEmployeeInfo = async (req, res) => {
  try {
    const { _id } = req.body;
    await IEmployeeInfo.findOneAndUpdate({ _id: _id }, { isactive: true });

    res.status(200).json({
      data: 1,
      status: "success",
      message: "Khôi phục thông tin người dùng thành công!",
    });
  } catch (e) {
    return res
      .status(500)
      .json({ data: -1, status: "error", message: e.message });
  }
};

//UPDATE
export const updateEmployeeInfo = async (req, res) => {
  try {
    const {
      username,
      fullname,
      contact,
      gender,
      dateofbirth,
      identitycardid,
      socialinsuranceid,
      startdatework,
      enddatework,
      reason,
      taxcode,
      salary,
      isactive,
      department,
      position,
      store,
      shift,
    } = req.body;

    await IEmployeeInfo.findOneAndUpdate(
      { username: username },
      {
        fullname,
        contact,
        gender,
        dateofbirth,
        identitycardid,
        socialinsuranceid,
        startdatework,
        enddatework,
        reason,
        taxcode,
        salary,
        isactive,
        department,
        position,
        store,
        shift,
      }
    );

    res.json({
      data: 1,
      status: "success",
      message: "Cập nhật thông tin người dùng thành công!",
    });
  } catch (e) {
    return res
      .status(500)
      .json({ data: -1, status: "error", message: e.message });
  }
};
