import IEmployeeInfo from "../models/employeeInfo.js";
import { mongooseHelper } from "../utils/_helper.js";

//LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(200).json({
        message: "Vui lòng nhập đầy đủ thông tin đăng nhập!",
        status: "error",
      });
    }

    const userInfo = mongooseHelper.ToObject(
      await IEmployeeInfo.findOne({ username: username, isactive: true })
    );

    if (userInfo === null) {
      return res.status(200).json({
        status: "error",
        message: "Không tồn tại thông tin tài khoản!",
      });
    }

    if (password !== userInfo.password) {
      return res
        .status(200)
        .json({ status: "error", message: "Sai thông tin tài khoản!" });
    }

    res
      .status(200)
      .json({ status: "success", data: userInfo, message: "Đăng nhập thành công!" });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
};

export const changepass = async (req, res) => {
  try {
    const { username, oldpass, newpass } = req.body;

    const userInfo = mongooseHelper.ToObject(
      await IEmployeeInfo.findOne({ username: username, isactive: true })
    );

    if (oldpass !== userInfo.password) {
      return res.status(200).json({
        data: false,
        status: "error",
        message: "Mật khẩu hiện tại sai!",
      });
    } else {
      await IEmployeeInfo.findOneAndUpdate(
        { username: username },
        { password: newpass }
      );
      res.status(200).json({
        data: true,
        status: "success",
        message: "Cập nhật mật khẩu thành công!",
      });
    }
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
};
