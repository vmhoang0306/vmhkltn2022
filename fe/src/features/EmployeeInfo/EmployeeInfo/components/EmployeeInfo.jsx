import { Form, Row, Space } from "antd";
import React from "react";
import { TitleUI } from "../../../../components/general";

function EmployeeInfo() {
  const [form] = Form.useForm();

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
            <TitleUI text="Test" level={1} />
          </Row>
        </Form>
      </Space>
    </React.Fragment>
  );
}

export default EmployeeInfo;
