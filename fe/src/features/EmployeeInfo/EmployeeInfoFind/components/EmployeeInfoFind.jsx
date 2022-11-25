import { Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import React from "react";
import { TitleUI } from "../../../../components/general";
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { Utils } from "../../../../utils/utils";

const { Option } = Select;

function EmployeeInfoFind() {
  const [form] = Form.useForm();
  const today = new Date()

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
          <Row className="d-flex justify-content-flex-start" gutter={[20, 0]}>
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
                        locale={locale}
                        format="DD/MM/YYYY"
                        placeholder="Từ ngày"
                        className="w-100 min-width-100px"
                        defaultValue={moment(
                          Utils.date.getTheOlddate(today, 7)
                        )}
                      />
                    </Form.Item>
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Form.Item className="m-0" name="todate">
                      <DatePicker
                        locale={locale}
                        format="DD/MM/YYYY"
                        placeholder="Đến ngày"
                        className="w-100 min-width-100px"
                        defaultValue={moment(today)}
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
          </Row>
        </Form>
      </Space>
    </React.Fragment>
  );
}

export default EmployeeInfoFind;
