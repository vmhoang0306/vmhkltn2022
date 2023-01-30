import { LoginOutlined } from "@ant-design/icons";
import { Col, Divider, Form, Input, Row, Space } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import Background from "../../assets/images/background-homepage.jpg";
import EmptyCardNoHeader from "../../components/card/EmptyCardNoHeader";
import { ButtonUI, TitleUI } from "../../components/general";
import { ApiConstants } from "../../constant";
import { PAGE_URL } from "../../constant/route";
import { Notify } from "../../helpers";
import { Utils } from "../../utils";
import LoadingFullWidth from "../common/LoadingFullWidth";
import { AuthContext } from "./Context/AuthContext";

function LoginPage() {
  const [form] = Form.useForm();
  const history = useHistory();
  const authInfo = useContext(AuthContext);
  const [requesting, setRequesting] = useState(false);

  const handleLogin = () => {
    form.submit();
  };

  const handleFinish = async (e: { username: string; password: string }) => {
    const url = ApiConstants.login;
    const data = {
      username: e.username,
      password: Utils.enCode(e.password),
    };

    setRequesting(true);
    const res: any = await axios.post(url, data);

    if (res.data.status === "success") {
      authInfo.login(data.username);
      history.push(PAGE_URL.EMPLOYEEINFO.INFO);
    } else {
      console.log(res.data.message);
      Notify.error(
        "",
        res.data.message && res.status === 200
          ? res.data.message
          : "Xảy ra lỗi!"
      );
      setRequesting(false);
    }
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
            {!requesting ? (
              <img src={Background} alt="" className="img-bg-homepage" />
            ) : (
              <LoadingFullWidth />
            )}
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
                        message: "Vui lòng nhập mật khẩu!",
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
