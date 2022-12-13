import { CheckCircleOutlined } from "@ant-design/icons";
import { Divider, Form, Input, Row, Space } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { ButtonUI, TextUI, TitleUI } from "../../../components/general";
import { ModalConfirm } from "../../../components/modules";
import { ApiConstants, PAGE_URL } from "../../../constant";
import { Notify } from "../../../helpers";
import { Utils } from "../../../utils";
import { AuthContext } from "../../Login/Context/AuthContext";

function ChangePassManage() {
  const [form] = Form.useForm();
  const history = useHistory();
  const authInfo = useContext(AuthContext);

  const [requesting, setRequesting] = useState(false);

  const [showLogout, setShowLogout] = useState(false);

  const handleConfirm = () => {
    form.submit();
  };

  const handleFinish = async (e: any) => {
    const oldpass = e.oldpass;
    const newpass = e.newpass;
    const repeat = e.repeat;

    if (oldpass === newpass) {
      Notify.warning("", "Mật khẩu mới là mật khẩu hiện tại!");
      form.resetFields(["newpass", "repeat"]);
    } else if (newpass !== repeat) {
      Notify.warning("", "Hãy xác nhận lại mật khẩu mới!");
      form.resetFields(["repeat"]);
    } else {
      const url = ApiConstants.changepass;
      const data = {
        username: authInfo.username,
        oldpass: Utils.enCode(oldpass),
        newpass: Utils.enCode(newpass),
      };

      setRequesting(true);
      const res: any = await axios.post(url, data);
      setRequesting(false);

      if (res.data.status === "success") {
        form.resetFields();
        Notify.success(
          "",
          res.data.message ? res.data.message : "Cập nhật mật khẩu thành công!"
        );
        setShowLogout(true);
      } else {
        console.log(res.data.message);
        Notify.error(
          "",
          res.data.message && res.status === 200
            ? res.data.message
            : "Xảy ra lỗi!"
        );
      }
    }
  };

  return (
    <React.Fragment>
      <Space size={50} direction="vertical" className="w-100" wrap>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="d-flex justify-content-center"
        >
          <Row
            className="max-width-600px justify-content-center"
            gutter={[20, 0]}
          >
            <TitleUI level={1} text="Thay đổi mật khẩu" />

            <Divider />

            <Form.Item
              className="w-100"
              name="username"
              label={<TitleUI text="Username" />}
            >
              <Input
                disabled
                defaultValue={authInfo.username}
                className="w-100 min-width-100px"
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              className="w-100"
              name="oldpass"
              label={<TitleUI text="Mật khẩu hiện tại" />}
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống trường này!",
                },
              ]}
            >
              <Input.Password
                className="w-100 min-width-100px"
                placeholder="Nhập mật khẩu hiện tại"
              />
            </Form.Item>

            <Form.Item
              className="w-100"
              name="newpass"
              label={<TitleUI text="Mật khẩu mới" />}
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống trường này!",
                },
              ]}
            >
              <Input.Password
                className="w-100 min-width-100px"
                placeholder="Nhập mật khẩu mới"
              />
            </Form.Item>

            <Form.Item
              className="w-100"
              name="repeat"
              label={<TitleUI text="Xác nhận lại mật khẩu mới" />}
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống trường này!",
                },
              ]}
            >
              <Input.Password
                className="w-100 min-width-100px"
                placeholder="Nhập mật khẩu mới"
              />
            </Form.Item>

            <Divider className="mt-0" />

            <ButtonUI
              className="w-100"
              color="success"
              icon={<CheckCircleOutlined />}
              text="Xác nhận thay đổi"
              onClick={handleConfirm}
              loading={requesting}
            />
          </Row>
        </Form>
      </Space>

      <ModalConfirm
        divider
        textCancel="Ở lại hệ thống"
        textConfirm="Đăng xuất khỏi hệ thống"
        visible={showLogout}
        setVisible={setShowLogout}
        title={"Đăng xuất"}
        handleConfirm={authInfo.logout}
        handleCancel={() => {
          history.push(PAGE_URL.HOME);
        }}
        width={768}
      >
        <TextUI text="Đăng xuất khỏi hệ thống?" />
      </ModalConfirm>
    </React.Fragment>
  );
}

export default ChangePassManage;
