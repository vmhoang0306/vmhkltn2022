import {
  EyeOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Divider, Form, Input, Row, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ButtonUI, TextUI, TitleUI } from "../../../components/general";
import { ModalConfirm } from "../../../components/modules";
import { ApiConstants } from "../../../constant";
import { Notify } from "../../../helpers";
import { IEmployeeInfo, IParamsSearch } from "../../../models";
import { Utils } from "../../../utils";
import LoadingFullWidth from "../../common/LoadingFullWidth";

function EmployeeInfoFind() {
  const [form] = Form.useForm();
  const [lstData, setLstData] = useState<IEmployeeInfo[]>();
  const [requesting, setRequesting] = useState(false);
  const [detail, setDetail] = useState<IEmployeeInfo>();
  const [showDetail, setShowDetail] = useState(false);
  const NO_DATA = "-Chưa có dữ liệu-";

  useEffect(() => {
    form.setFieldsValue({ keysearch: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: <TextUI strong text="Username" />,
      dataIndex: "username",
      key: "username",
      width: 125,
    },
    {
      title: <TextUI strong text="Họ tên" />,
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: <TextUI strong text="Số điện thoại" />,
      key: "phonenumber",
      render: (_text: string, record: IEmployeeInfo) => {
        return <TextUI text={record.contact?.phonenumber!} />;
      },
      width: 125,
    },
    {
      title: <TextUI strong text="Phòng ban" />,
      key: "department",
      render: (_text: string, record: IEmployeeInfo) => {
        return <TextUI text={record.department?.departmentname!} />;
      },
    },
    {
      title: <TextUI strong text="Siêu thị" />,
      key: "store",
      render: (_text: string, record: IEmployeeInfo) => {
        return <TextUI text={record.store?.storename!} />;
      },
    },
    {
      title: <TextUI strong text="Trạng thái" />,
      dataIndex: "isactive",
      key: "isactive",
      render: (_text: string, record: IEmployeeInfo) => {
        return record.isactive ? (
          <Tag color="green">Đang hoạt động</Tag>
        ) : (
          <Tag color="red">Ngừng hoạt động</Tag>
        );
      },
    },
    {
      title: (
        <TextUI className="d-flex justify-content-flex-end" strong text="#" />
      ),
      key: "#",
      render: (_text: string, record: IEmployeeInfo) => {
        return (
          <ButtonUI
            icon={<EyeOutlined />}
            onClick={() => {
              setShowDetail(true);
              setDetail(record);
            }}
          />
        );
      },
      width: 60,
    },
  ];

  const handleSearch = () => {
    form.submit();
  };

  const handleFinish = async (e: IParamsSearch) => {
    const url = ApiConstants.employeeinfo.findbykeysearch;
    const params: IParamsSearch = { keysearch: e.keysearch };

    if (params.keysearch?.length! > 0) {
      setRequesting(true);
      const res: any = await axios.get(url, { params });
      setRequesting(false);

      if (res.data.status === "success") {
        setLstData(res.data.data);
      } else {
        Notify.error("", res.data.message ? res.data.message : "Xảy ra lỗi!");
      }
    } else {
      Notify.warning("", "Hãy nhập từ khóa tìm kiếm!");
    }
  };

  return (
    <React.Fragment>
      <Space size={50} direction="vertical" className="w-100" wrap>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="form-row-gap-2"
        >
          <Row
            className="d-flex justify-content-flex-start align-items-flex-end"
            gutter={[20, 0]}
          >
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="keysearch"
                label={<TitleUI text="Từ khóa tìm kiếm" />}
              >
                <Input
                  className="w-100 min-width-100px"
                  placeholder="Nhập từ khóa tìm kiếm"
                />
              </Form.Item>
            </Col>

            <Col
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={24}
              className="d-flex justify-content-flex-end"
              style={{ marginBottom: "24px" }}
            >
              <ButtonUI
                icon={<SearchOutlined />}
                text="Tìm"
                onClick={handleSearch}
              />
            </Col>
            
            {requesting ? (
              <Space className="w-100 justify-content-center">
                <LoadingFullWidth />
              </Space>
            ) : (
              <Table
                className="w-100 mt-3"
                dataSource={lstData}
                pagination={false}
                scroll={{ y: 360 }}
                columns={columns}
                rowKey="index"
              />
            )}
          </Row>
        </Form>
      </Space>

      <ModalConfirm
        visible={showDetail}
        setVisible={setShowDetail}
        title={`Thông tin nhân viên: ${detail?.username} - ${detail?.fullname}`}
        showButtonConfirm={false}
        textCancel={"Trở lại"}
        width={768}
      >
        <React.Fragment>
          <Row className="d-flex justify-space-between" gutter={[0, 10]}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Divider orientation="left" orientationMargin="0">
                <Space direction="horizontal">
                  <InfoCircleOutlined />
                  <TitleUI text="Thông tin cá nhân" />
                </Space>
              </Divider>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Ngày sinh: </span>
              {Utils.date.formatDate(detail?.dateofbirth)}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Số điện thoại: </span>
              {detail?.contact?.phonenumber}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Email: </span>
              {detail?.contact?.email}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Giới tính: </span>
              <Tag color={detail?.gender === 1 ? "blue" : "pink"}>
                {detail?.gender === 1 ? "Nam" : "Nữ"}
              </Tag>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Siêu thị: </span>
              {detail?.store?.storename}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Phòng ban: </span>
              {detail?.department?.departmentname}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Chức vụ: </span>
              {detail?.position?.positionname}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Loại phân ca: </span>
              {detail?.shift?.shiftname}
            </Col>
          </Row>

          <Row className="d-flex justify-space-between" gutter={[0, 10]}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Divider orientation="left" orientationMargin="0">
                <Space direction="horizontal">
                  <InfoCircleOutlined />
                  <TitleUI text="Thông tin công việc" />
                </Space>
              </Divider>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">CCCD: </span>
              <Tag color={"cyan"}>{"************"}</Tag>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Mã bảo hiểm xã hội: </span>
              <Tag color={"orange"}>{"************"}</Tag>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Mã số thuế: </span>
              <Tag color={"purple"}>{"************"}</Tag>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Trạng thái: </span>
              <Tag color={detail?.isactive ? "green" : "red"}>
                {detail?.isactive ? "Đang hoạt động" : "Dừng hoạt động"}
              </Tag>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Ngày vào làm: </span>
              {Utils.date.formatDate(detail?.startdatework)}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Ngày thôi việc: </span>
              {detail?.enddatework === null
                ? NO_DATA
                : Utils.date.formatDate(detail?.enddatework)}
            </Col>
          </Row>
        </React.Fragment>
      </ModalConfirm>
    </React.Fragment>
  );
}

export default EmployeeInfoFind;
