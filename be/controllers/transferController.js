import ITransferReport from "../models/transferReport.js";
import IDepartment from "../models/department.js";
import IEmployeeInfo from "../models/employeeInfo.js";

export const getList = async (req, res) => {
  const username = req.query.username;

  try {
    const results = await ITransferReport.find({
      $and: [{ username: username }, { isdelete: false }],
    })
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
      isdelete: false,
    });

    // const checkExists = await ITransferReport.find({
    //   $and: [
    //     { username: username },
    //     { currentdepartment: currentdepartment },
    //     { newdepartment: newdepartment },
    //     { status: status },
    //     { isdelete: false },
    //   ],
    // });

    await newTransfer.save();

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
    await ITransferReport.findOneAndUpdate({ _id: _id }, { isdelete: true });

    res.status(200).json({
      data: 1,
      status: "success",
      message: "Xóa phiếu dùng thành công!",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};
