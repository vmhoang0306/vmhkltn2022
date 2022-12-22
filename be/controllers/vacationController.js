import ITimekeeping from "../models/timekeeping.js";
import IEmployeeInfo from "../models/employeeInfo.js";
import IVacationApproval from "../models/vacationApproval.js";
import IVacationRequirement from "../models/vacationRequirement.js";

export const getApprovedUser = async (req, res) => {
  const department = req.query.department;

  try {
    const data = await IEmployeeInfo.find({
      $and: [
        { department },
        { isactive: true },
        {
          position: {
            $in: [
              "6388c808e04edff798f8f405",
              "6388c83fe04edff798f8f406",
              "6388c8f0e04edff798f8f40a",
              "6388c93ee04edff798f8f40b",
              "6388c93ee04edff798f8f40b",
            ],
          },
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: data,
      message: "Danh sách người duyệt",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};

export const createVacationRequirement = async (req, res) => {
  try {
    const { username, fromdate, todate, reason, approveduser } = req.body;
    const newItem = new IVacationRequirement({
      username,
      fromdate,
      todate,
      status: 0,
      reason,
    });

    if (todate < fromdate) {
      res.status(200).json({
        data: 0,
        status: "error",
        message: "Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu!",
      });
    }

    const newVacationRequirement = await newItem.save();

    const newApprove = new IVacationApproval({
      vacationrequirement: newVacationRequirement._id,
      status: 0,
      note: "",
      approveduser,
      approveddate: null,
    });
    await newApprove.save();

    res.status(200).json({
      data: 1,
      status: "success",
      message: "Tạo đăng ký nghỉ phép thành công!",
    });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
};

export const approvedVacation = async (req, res) => {
  try {
    const { vacationrequirement, status, note, appeoveduser } = req.body;
    await IVacationApproval.findOneAndUpdate(
      { vacationrequirement },
      { status, note, appeoveduser, approveddate: now() }
    );
    const detail = await IVacationRequirement.findOneAndUpdate(
      { _id: vacationrequirement },
      { status }
    );

    if (status === 1) {
      await ITimekeeping.findOneAndUpdate(
        {
          $and: [
            { username: detail.username },
            { date: { $gte: Utils.date.formatDateInput(detail.fromdate) } },
            { date: { $lt: Utils.date.nextdate(detail.todate) } },
          ],
        },
        {
          isvacation: true,
          hour: 8,
        }
      );
    }

    res.status(200).json({
      data: 1,
      status: "success",
      message: "Duyệt đăng ký nghỉ phép thành công!",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};
