import { LoginOutlined } from "@ant-design/icons";
import { Col, Divider, Form, Input, Row, Space } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import Background from "../../assets/images/background-homepage.png";
import EmptyCardNoHeader from "../../components/card/EmptyCardNoHeader";
import { ButtonUI, TitleUI } from "../../components/general";
import { Notify } from "../../helpers";
import { Utils } from "../../utils/utils";
import { AuthContext } from "./Context/AuthContext";

function LoginPage() {
  const [form] = Form.useForm();
  const authInfo = useContext(AuthContext);
  const [requesting, setRequesting] = useState(false);

  const handleLogin = () => {
    form.submit();
  };

  const handleFinish = async () => {
    const url = "http://localhost:5000/api/auth/login";
    const data = {
      username: form.getFieldValue("username"),
      password: Utils.enCode(form.getFieldValue("password")),
    };

    setRequesting(true);
    const res = await axios.post(url, data);
    console.log(res);

    if (res.data.status === "success") {
      Notify.success("", res.message ? res.message : "Đăng nhập thành công!");
      authInfo.login(res.username);
    } else {
      Notify.error("", res.message ? res.message : "Xảy ra lỗi!");
      setRequesting(false);
    }
    setRequesting(false);
  };

  return (
    <React.Fragment>
      <Space size={50} direction="vertical" className="w-100 my-5">
        <Row>
          <Col
            xl={14}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            className="d-flex justify-content-center"
          >
            <img src={Background} alt="" className="img-bg-homepage" />
          </Col>

          <Col
            xl={10}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            className="w-100 d-flex align-items-center justify-content-center"
          >
            <EmptyCardNoHeader
              isRadius={true}
              isShadow={true}
              children={
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleFinish}
                  className="form-row-gap-0"
                >
                  <Form.Item className="d-flex justify-content-center">
                    <TitleUI text="Đăng nhập" level={1} className="mt-1" />
                  </Form.Item>

                  <Divider className="mt-0" />

                  <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập!",
                      },
                    ]}
                    className="w-100 min-width-300px"
                  >
                    <Input placeholder="Tên đăng nhập ..." />
                  </Form.Item>

                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên mật khẩu!",
                      },
                    ]}
                    className="w-100 min-width-300px"
                  >
                    <Input.Password placeholder="Mật khẩu ..." />
                  </Form.Item>

                  <Divider className="mt-0" />

                  <Form.Item className="d-flex justify-content-center">
                    <ButtonUI
                      text="Đăng nhập"
                      icon={<LoginOutlined />}
                      onClick={handleLogin}
                      loading={requesting}
                    />
                  </Form.Item>
                </Form>
              }
            />
          </Col>
        </Row>
      </Space>
    </React.Fragment>
  );
}

export default LoginPage;
