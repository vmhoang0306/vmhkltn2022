import IEmployeeInfo from "../models/employeeInfo.js";
import { mongooseHelper } from "../utils/_helper.js";

//LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin đăng nhập!",
        status: "error",
      });
    }

    const userInfo = mongooseHelper.ToObject(
      await IEmployeeInfo.findOne({ username: username })
    );

    if (userInfo === null) {
      return res.status(400).json({
        status: "error",
        message: "Không tồn tại thông tin tài khoản!",
      });
    }

    if (password !== userInfo.password) {
      return res
        .status(400)
        .json({ status: "error", message: "Sai thông tin tài khoản!" });
    }

    res
      .status(200)
      .json({ status: "success", message: "Đăng nhập thành công!" });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
};
