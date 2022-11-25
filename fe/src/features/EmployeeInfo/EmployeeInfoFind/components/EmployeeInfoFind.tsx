import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, DatePicker, Form, Input, Row, Select, Space, Table } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import React from "react";
import { ButtonUI, TextUI, TitleUI } from "../../../../components/general";
import { Utils } from "../../../../utils";

const { Option } = Select;

function EmployeeInfoFind() {
  const [form] = Form.useForm();
  const today = new Date();
  const DATE_FORMAT = "DD/MM/YYYY";

  const columns = [
    {
      title: <TextUI strong text="STT" />,
      dataIndex: "stt",
      key: "stt",
      render: (_text: string, _record: any, index: any) => {
        return <>{index + 1}</>;
      },
      width: 75,
      fixed: "left" as "left",
    },
    {
      title: <TextUI strong text="Nội dung hiển thị" />,
      dataIndex: "newscontent",
      key: "newscontent",
      width: 200,
      fixed: "left" as "left",
    },
    {
      title: <TextUI strong text="Thứ tự" />,
      dataIndex: "displayindex",
      key: "displayindex",
      width: 80,
    },
    {
      title: <TextUI strong text="Liên kết" />,
      dataIndex: "link",
      key: "link",
      render: (_text: string, _record: any) => {
        return (
          <a href={_record.link} target="_blank" rel="noreferrer">
            {_record.link}
          </a>
        );
      },
    },
    {
      title: <TextUI strong text="Ngày bắt đầu" />,
      dataIndex: "startdate",
      key: "startdate",
      width: 200,
    },
    {
      title: <TextUI strong text="Ngày kết thúc" />,
      dataIndex: "enddate",
      key: "enddate",
      render: (_text: string, _record: any) => {
        return _record.enddate ? (
          <TextUI
            text={`${Utils.date.getDate(
              _record.enddate
            )} - ${Utils.date.getTime(_record.enddate)}`}
          />
        ) : (
          <TextUI italic text="Chưa có dữ liệu" />
        );
      },
      width: 200,
    },
    {
      title: (
        <TextUI strong text="#" className="d-flex justify-content-flex-end" />
      ),
      dataIndex: "#",
      key: "#",
      render: (_text: string, _record: any) => {
        return (
          <Space className="w-100 d-flex justify-content-flex-end">
            <ButtonUI color="primary" icon={<EditOutlined />} />

            <ButtonUI color="danger" icon={<DeleteOutlined />} />
          </Space>
        );
      },
      width: 100,
    },
  ];

  const handleFinish = () => {};

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
            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
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

            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <Form.Item label={<TitleUI text="Ngày nhập đá" />}>
                <Row gutter={[10, 0]}>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Form.Item className="m-0" name="fromdate">
                      <DatePicker
                        // locale={locale}
                        format={DATE_FORMAT}
                        placeholder="Từ ngày"
                        className="w-100 min-width-100px"
                        defaultValue={dayjs(
                          Utils.date.getDate(
                            Utils.date.getTheOlddate(today, 7)
                          ),
                          DATE_FORMAT
                        )}
                      />
                    </Form.Item>
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Form.Item className="m-0" name="todate">
                      <DatePicker
                        locale={locale}
                        format={DATE_FORMAT}
                        placeholder="Đến ngày"
                        className="w-100 min-width-100px"
                        defaultValue={dayjs(
                          Utils.date.getDate(today),
                          DATE_FORMAT
                        )}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>

            <Col xl={6} lg={8} md={12} sm={12} xs={24}>
              <Form.Item name="status" label={<TitleUI text="Trạng thái" />}>
                <Select
                  className="w-100 min-width-100px"
                  placeholder="Chọn trạng thái"
                  defaultValue={undefined}
                >
                  <Option value={undefined}>Tất cả</Option>
                  <Option value={-2}>Không xác nhận</Option>
                  <Option value={-1}>Không duyệt</Option>
                  <Option value={0}>Chờ duyệt</Option>
                  <Option value={1}>Đã duyệt</Option>
                  <Option value={2}>Đã xác nhận</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col
              xl={6}
              lg={8}
              md={24}
              sm={24}
              xs={24}
              className="d-flex justify-content-flex-end"
              style={{ marginBottom: "24px" }}
            >
              <ButtonUI icon={<SearchOutlined />} text="Tìm" />
            </Col>

            <Table
              className="mt-3"
              dataSource={[{}]}
              scroll={{ x: 1300 }}
              pagination={false}
              columns={columns}
              rowKey="index"
            />
          </Row>
        </Form>
      </Space>
    </React.Fragment>
  );
}

export default EmployeeInfoFind;
