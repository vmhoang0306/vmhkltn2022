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

    const userInfo = mongooseHelper.ToObject(await IEmployeeInfo.findOne({
      username: username,
    }));

    if (userInfo === null) {
      return res.status(401).json({
        message: "Không tồn tại thông tin tài khoản!",
        status: "error",
      });
    }

    if (password !== userInfo.password) {
      return res
        .status(401)
        .json({ message: "Sai thông tin tài khoản!", status: "error" });
    }

    res
      .status(200)
      .json({ message: "Đăng nhập thành công!", status: "success" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
