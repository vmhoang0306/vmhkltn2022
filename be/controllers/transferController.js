import ITransferApproval from "../models/transferApproval.js";
import ITransferReport from "../models/transferReport.js";
import IDepartment from "../models/department.js";
import IEmployeeInfo from "../models/employeeInfo.js";

export const getList = async (req, res) => {
  const username = req.query.username;

  try {
    const results = await ITransferReport.find({ username: username })
      .populate("username")
      .populate("newdepartment")
      .populate("currentdepartment");

    res.status(200).json({
      status: "success",
      data: results,
      message: "",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};

export const createTransfer = async (req, res) => {
  try {
    const { username, currentdepartment, newdepartment, reason, status } =
      req.body;
    const newTransfer = new ITransferReport({
      username,
      currentdepartment,
      newdepartment,
      reason,
      status,
    });

    const checkExists = await ITransferReport.find({
      $and: [{ username: username }, { status: 0 }],
    });

    if (checkExists.length > 0 || checkExists === null) {
      return res.status(200).json({
        data: -1,
        status: "error",
        message: "Tồn tại phiếu chưa xử lý hoàn tất!",
      });
    }

    const newItems = await newTransfer.save();

    const newTransferApproval = new ITransferApproval({
      transferreport: newItems._id,
      status: 0,
      note: null,
      approveduser: null,
      approveddate: null,
    });
    await newTransferApproval.save();

    res.status(200).json({
      data: 1,
      status: "success",
      message: "Thêm phiếu thành công!",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};

export const deleteTransfer = async (req, res) => {
  try {
    const { _id } = req.body;
    await ITransferReport.findOneAndRemove({ _id: _id });
    await ITransferApproval.findOneAndRemove({ transferreport: _id });

    res.status(200).json({
      data: 1,
      status: "success",
      message: "Xóa phiếu dùng thành công!",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};

export const approveTransfer = async (req, res) => {
  const today = new Date();

  try {
    const { _id, status, note, appeoveduser } = req.body;
    await ITransferApproval.findOneAndUpdate(
      { transferreport: _id },
      { status, note, appeoveduser, approveddate: today }
    );

    await ITransferReport.findOneAndUpdate({ _id: _id }, { status });

    res.status(200).json({
      data: 1,
      status: "success",
      message: "Đã duyệt đăng ký thuyên chuyển!",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};

export const getListForManager = async (req, res) => {
  const username = req.query.username;

  try {
    const userInfo = await IEmployeeInfo.findOne({ username: username });

    const approvalInfo = await ITransferReport.find({
      newdepartment: userInfo.department,
    })
      .populate("username")
      .populate("newdepartment")
      .populate("currentdepartment");

    res.status(200).json({
      data: approvalInfo,
      status: "success",
      message: "Lấy danh sách thuyên chuyển thành công!",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};
