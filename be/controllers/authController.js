import IEmployeeInfo from "../models/employeeInfo.js";

//LOGIN
export const login = async (req, res) => {
  try {
    const { username, passwork } = req.body;
    if (!username || !passwork) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin đăng nhập!",
        status: "error",
      });
    }

    const userInfo = await IEmployeeInfo.findOne({
      username: username,
    });

    if (!userInfo) {
      return res.status(401).json({
        message: "Không tồn tại thông tin tài khoản!",
        status: "error",
      });
    }

    if (passwork !== userInfo.passwork) {
      return res
        .status(401)
        .json({ message: "Sai thông tin tài khoản!", status: "error" });
    }

    res
      .status(200)
      .json({ message: "Đăng nhập thành công!", status: "success" });
  } catch (e) {
    res.status(400).json({ message: error.message });
  }
};
