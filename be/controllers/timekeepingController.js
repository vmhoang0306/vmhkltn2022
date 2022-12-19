import ITimekeeping from "../models/timekeeping.js";
import { Utils } from "../utils/utils.js";

export const createTimekeeping = async (req, res) => {
  try {
    const today = new Date();
    const { username } = req.body;

    const checkExists = await ITimekeeping.find({
      $and: [
        { username: username },
        { date: { $gte: Utils.date.formatDateInput(today) } },
      ],
    });

    if (checkExists.length > 0 || checkExists === null) {
      return res.status(200).json({
        data: checkExists,
        status: "success",
        message: "Đã tạo chấm công!",
      });
    }

    const newTimekeeping = new ITimekeeping({
      username,
      ischeck: false,
      hour: null,
      date: Utils.date.formatDateInput(today),
    });
    const newItem = await newTimekeeping.save();

    res.status(200).json({
      data: newItem,
      status: "success",
      message: "Thêm thông tin chấm công thành công!",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};

export const checkTimekeeping = async (req, res) => {
  try {
    const { username, hour, date } = req.body;

    await ITimekeeping.findOneAndUpdate(
      { username },
      { ischeck: true, hour, date }
    );

    res.status(200).json({
      data: 1,
      status: "success",
      message: "Đã chấm công!",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};
