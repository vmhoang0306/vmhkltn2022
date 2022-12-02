import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Divider, Form, Row, Space, Tag } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TextUI, TitleUI } from "../../../../components/general";
import { ApiConstants } from "../../../../constant";
import { Notify } from "../../../../helpers";
import { IEmployeeInfo } from "../../../../models";
import { Utils } from "../../../../utils";
import LoadingFullWidth from "../../../common/LoadingFullWidth";
import { AuthContext } from "../../../Login/Context/AuthContext";

function EmployeeInfo() {
  const authInfo = useContext(AuthContext);
  const [info, setInfo] = useState<IEmployeeInfo>();
  const [requesting, setRequesting] = useState(true);
  const NO_DATA = "-Chưa có dữ liệu-";

  useEffect(() => {
    const initData = async () => {
      const url = ApiConstants.employeeinfo.getbyid;
      const params = { username: authInfo.username };

      setRequesting(true);
      const res: any = await axios.get(url, { params });

      if (res.data.status === "success") {
        setInfo(res.data.data);
      } else {
        Notify.error("", res.data.message ? res.data.message : "Xảy ra lỗi!");
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
            <Col xl={6} lg={6} md={6} sm={0} xs={0}>
              <Divider />
            </Col>
            <Space className="px-1" direction="vertical">
              <TitleUI
                className="d-flex justify-content-center text-align-center"
                text={info?.fullname}
                level={1}
              />
              <TextUI
                italic
                className="d-flex justify-content-center"
                text={`Mã nhân viên: ${info?.username}`}
              />
            </Space>
            <Col xl={6} lg={6} md={6} sm={0} xs={0}>
              <Divider />
            </Col>
          </Row>

          <Row className="d-flex justify-space-between" gutter={[0, 10]}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Divider orientation="left" orientationMargin="0">
                <Space direction="horizontal">
                  <InfoCircleOutlined style={{ fontSize: "24px" }} />
                  <TitleUI level={3} text="Thông tin cá nhân" />
                </Space>
              </Divider>
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">Ngày sinh: </span>
              {Utils.date.formatDate(info?.dateofbirth)}
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">Số điện thoại: </span>
              {info?.contact?.phonenumber}
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">Email: </span>
              {info?.contact?.email}
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">Giới tính: </span>
              <Tag color={info?.sex === 1 ? "blue" : "pink"}>
                {info?.sex === 1 ? "Nam" : "Nữ"}
              </Tag>
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">Siêu thị: </span>
              {info?.store.storename}
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">Phòng ban: </span>
              {info?.department.departmentname}
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">Chức vụ: </span>
              {info?.position.positionname}
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">Loại phân ca: </span>
              {info?.shift.shiftname}
            </Col>
          </Row>

          <Row className="d-flex justify-space-between" gutter={[0, 10]}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Divider orientation="left" orientationMargin="0">
                <Space direction="horizontal">
                  <InfoCircleOutlined style={{ fontSize: "24px" }} />
                  <TitleUI level={3} text="Thông tin công việc" />
                </Space>
              </Divider>
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">CCCD: </span>
              <Tag color={"cyan"}>{info?.identitycardid}</Tag>
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">Mã bảo hiểm xã hội: </span>
              <Tag color={"orange"}>{info?.socialinsuranceid}</Tag>
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">Mã số thuế: </span>
              <Tag color={"purple"}>{info?.taxcode}</Tag>
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">Trạng thái: </span>
              <Tag color={info?.isactive ? "green" : "red"}>
                {info?.isactive ? "Đang hoạt động" : "Dừng hoạt động"}
              </Tag>
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">Ngày vào làm: </span>
              {Utils.date.formatDate(info?.startdatework)}
            </Col>
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <span className="txt-bold">Ngày thôi việc: </span>
              {info?.enddatework === null
                ? NO_DATA
                : Utils.date.formatDate(info?.enddatework)}
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <span className="txt-bold">Lý do: </span>
              {info?.reason ? info.reason : NO_DATA}
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
