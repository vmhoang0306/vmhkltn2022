import { SearchOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Space, Table } from "antd";
import React, { useState } from "react";
import { TitleUI, ButtonUI } from "../../../components/general";
import { IEmployeeInfo } from "../../../models";
import LoadingFullWidth from "../../common/LoadingFullWidth";

function EmployeeManage() {
  const [form] = Form.useForm();
  const [lstData, setLstData] = useState<IEmployeeInfo[]>();
  const [requesting, setRequesting] = useState(false);

  const handleSearch = () => {
    form.submit();
  };

  const handleFinish = async (e: any) => {};

  return !requesting ? (
    <React.Fragment>
      <Space size={50} direction="vertical" className="w-100" wrap>
        <Form
          form={form}
          layout="vertical"
          className="form-row-gap-2"
          onFinish={handleFinish}
        >
          <Row
            className="d-flex justify-content-center align-items-center"
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
                columns={[]}
                rowKey="index"
              />
            )}
          </Row>
        </Form>
      </Space>
    </React.Fragment>
  ) : (
    <LoadingFullWidth />
  );
}

export default EmployeeManage;
