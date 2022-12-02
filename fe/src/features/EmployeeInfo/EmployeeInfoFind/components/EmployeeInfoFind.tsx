import { SearchOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Space, Table } from "antd";
import React from "react";
import { ButtonUI, TextUI, TitleUI } from "../../../../components/general";

function EmployeeInfoFind() {
  const [form] = Form.useForm();

  const columns = [
    {
      title: <TextUI strong text="Username" />,
      dataIndex: "username",
      key: "username",
      fixed: "left" as "left",
    },
    {
      title: <TextUI strong text="Họ tên" />,
      dataIndex: "fullname",
      key: "fullname",
      fixed: "left" as "left",
    },
    {
      title: <TextUI strong text="Phòng ban" />,
      dataIndex: "department",
      key: "department",
    },
    {
      title: <TextUI strong text="Siêu thị" />,
      dataIndex: "store",
      key: "store",
    },
    {
      title: <TextUI strong text="Trạng thái" />,
      dataIndex: "status",
      key: "status",
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
              <ButtonUI icon={<SearchOutlined />} text="Tìm" />
            </Col>

            <Table
              className="w-100 mt-3"
              dataSource={[]}
              pagination={false}
              scroll={{ y: 360 }}
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
