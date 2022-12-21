import IVacationRequirement from "../models/vacationRequirement.js";

export const getApprovedUser = async (req, res) => {
  const { department } = req.query.department;

  try {
    const data = IEmployeeInfo.find({
      $or: [
        { department },
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
    const { username, fromdate, todate, note, approveduser } = req.body;
    const newItem = new IVacationRequirement({
      username,
      fromdate,
      todate,
      status: 0,
      note,
    });
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
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const approvedVacation = async (req, res) => {
  try {
    const { vacationrequirement, status, note, appeoveduser } = req.body;
    await IVacationApproval.findOneAndUpdate(
      { vacationrequirement },
      { status, note, appeoveduser, approveddate: now() }
    );
    await IVacationRequirement.findOneAndUpdate(
      { _id: vacationrequirement },
      { status }
    );

    res.status(200).json({
      data: 1,
      status: "success",
      message: "Duyệt đăng ký nghỉ phép thành công!",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};
