import ITimekeeping from "../models/timekeeping.js";
import { Utils } from "../utils/utils.js";

export const createTimekeeping = async (req, res) => {
  try {
    const today = new Date();
    const firstDate = Utils.date.firstdate(today);
    const { username } = req.body;

    const data = await ITimekeeping.find({
      $and: [
        { username: username },
        { date: { $gte: Utils.date.formatDateInput(firstDate) } },
        { date: { $lt: Utils.date.nextdate(today) } },
      ],
    });

    for (let i = 1; i <= today.getDate(); i++) {
      let check = false;
      data.forEach((item) => {
        if (item.date.getDate() === i) check = true;
      });

      if (!check) {
        check = false;
        const newTimekeeping = new ITimekeeping({
          username,
          ischeck: false,
          isvacation: false,
          hour: 0,
          date: Utils.date.formatDateInput(
            new Date(today.getFullYear(), today.getMonth(), i)
          ),
        });

        await newTimekeeping.save();
      }
    }

    const getTimekeepingToday = await ITimekeeping.find({
      $and: [
        { username: username },
        { date: { $gte: Utils.date.formatDateInput(today) } },
      ],
    });

    res.status(200).json({
      data: getTimekeepingToday,
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
      { $and: [{ username }, { date }] },
      { ischeck: true, hour }
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

export const getListTimekeeping = async (req, res) => {
  try {
    const today = new Date();
    const firstDate = Utils.date.firstdate(today);
    const username = req.query.username;

    const data = await ITimekeeping.find({
      $and: [
        { username: username },
        { date: { $gte: Utils.date.formatDateInput(firstDate) } },
        { date: { $lt: Utils.date.nextdate(today) } },
      ],
    }).sort({ date: -1 });

    res.status(200).json({
      data: data,
      status: "success",
      message: "Lấy lịch sử chấm công thành công!",
    });
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
};
