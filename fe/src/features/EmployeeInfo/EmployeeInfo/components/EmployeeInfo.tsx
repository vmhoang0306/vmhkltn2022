import { Col, Divider, Form, Row, Space } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TextUI, TitleUI } from "../../../../components/general";
import { ApiConstants } from "../../../../constant";
import { Notify } from "../../../../helpers";
import LoadingFullWidth from "../../../common/LoadingFullWidth";
import { AuthContext } from "../../../Login/Context/AuthContext";

function EmployeeInfo() {
  const authInfo = useContext(AuthContext);
  const [info, setInfo] = useState();
  const [requesting, setRequesting] = useState(true);

  useEffect(() => {
    const initData = async () => {
      const url = ApiConstants.employeeinfo.getbyid;
      const params = { username: authInfo.username };

      setRequesting(true);
      const res: any = await axios.get(url, { params });

      if (res.data.status !== "success") {
        Notify.error("", res.data.message ? res.message : "Xảy ra lỗi!");
        setRequesting(false);
      }
      setRequesting(false);
    };

    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !requesting ? (
    <React.Fragment>
      <Space size={50} direction="vertical" className="w-100" wrap>
        <Form layout="vertical" className="form-row-gap-2">
          <Row
            className="d-flex justify-content-center align-items-center"
            gutter={[50, 0]}
          >
            <Col xl={6} lg={6} md={4} sm={24} xs={24}>
              <Divider />
            </Col>
            <Space className="px-1" direction="vertical">
              <TitleUI
                className="d-flex justify-content-center text-align-center"
                text="188267 - Võ Minh Hoàng"
                level={1}
              />
              <TextUI
                italic
                className="d-flex justify-content-center"
                text="Phòng ban: Ứng dụng nghiệp vụ văn phòng"
              />
            </Space>
            <Col xl={6} lg={6} md={4} sm={24} xs={24}>
              <Divider />
            </Col>
          </Row>

          <Row className="d-flex justify-content-center">
            <Col xl={6} lg={6} md={12} sm={24} xs={24}>
              <span className="txt-bold">Ngày sinh: </span> 03/06/2001
            </Col>
            <Col xl={6} lg={6} md={12} sm={24} xs={24}>
              <span className="txt-bold">Số điện thoại: </span> 0706664818
            </Col>
            <Col xl={6} lg={6} md={12} sm={24} xs={24}>
              <span className="txt-bold">Email: </span> vominhhoang312@gmail.com
            </Col>
            <Col xl={6} lg={6} md={12} sm={24} xs={24}>
              <span className="txt-bold">Giới tính: </span> 03/06/2001
            </Col>
            <Col xl={6} lg={6} md={12} sm={24} xs={24}>
              <span className="txt-bold">Siêu thị: </span> 03/06/2001
            </Col>
            <Col xl={6} lg={6} md={12} sm={24} xs={24}>
              <span className="txt-bold">Phòng ban: </span> 03/06/2001
            </Col>
            <Col xl={6} lg={6} md={12} sm={24} xs={24}>
              <span className="txt-bold">Chức vụ: </span> 03/06/2001
            </Col>
          </Row>
        </Form>
      </Space>
    </React.Fragment>
  ) : (
    <LoadingFullWidth />
  );
}

export default EmployeeInfo;
