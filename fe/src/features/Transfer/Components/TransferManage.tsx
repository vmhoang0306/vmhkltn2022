import { PlusCircleOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ButtonUI, TextUI, TitleUI } from "../../../components/general";
import { ModalConfirm } from "../../../components/modules";
import { ApiConstants } from "../../../constant";
import { Notify } from "../../../helpers";
import { IDepartment, IStore } from "../../../models";
import SelectBase from "../../common/components/SelectBase";
import LoadingFullWidth from "../../common/LoadingFullWidth";

const { Option } = Select;

function TransferManage() {
  const [form] = Form.useForm();
  const [lstData, setLstData] = useState<any[]>();
  const [lstDpm, setLstDpm] = useState<any[]>([]);
  const [lstSt, setLstSt] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [requestingInit, setRequestingInit] = useState(false);
  const [transferType, setTransferType] = useState(1);

  useEffect(() => {
    const initData = async () => {
      const urlDpm = ApiConstants.department;
      const urlSt = ApiConstants.store;

      setRequestingInit(true);
      const dpm: any = await axios.get(urlDpm);
      const st: any = await axios.get(urlSt);
      setRequestingInit(false);

      if (dpm.data.status === "success" && dpm.data.data?.length! > 0) {
        setLstDpm(formatDataDpm(dpm.data.data));
      } else {
        Notify.error(
          "",
          dpm.data.message
            ? dpm.data.message
            : "Xảy ra lỗi khi lấy danh sách phòng ban!"
        );
      }

      if (st.data.status === "success" && dpm.data.data?.length! > 0) {
        setLstSt(formatDataStore(st.data.data));
      } else {
        Notify.error(
          "",
          st.data.message
            ? st.data.message
            : "Xảy ra lỗi khi lấy danh sách siêu thị!"
        );
      }
    };

    initData();
  }, []);

  const formatDataDpm = (data: IDepartment[]) => {
    let results: { value: any; title: any }[] = [];
    data.forEach((item) => {
      results.push({ value: item._id, title: item.departmentname });
    });
    return results;
  };
  const formatDataStore = (data: IStore[]) => {
    let results: { value: any; title: any }[] = [];
    data.forEach((item) => {
      results.push({ value: item._id, title: item.storename });
    });
    return results;
  };

  const onChangeType = (e: number) => {
    setTransferType(e);
  };

  const handleCancelAdd = () => {
    setShowAdd(false);
    form.resetFields();
  };
  const handleAdd = () => {
    setShowAdd(true);
  };

  const handleConfirm = () => {};

  const handleFinish = async (e: any) => {};

  return !requestingInit ? (
    <React.Fragment>
      <Space size={50} direction="vertical" className="w-100" wrap>
        <Form layout="vertical" className="form-row-gap-2">
          <Row
            className="d-flex justify-content-center align-items-center"
            gutter={[20, 0]}
          >
            <Col xl={16} lg={16} md={16} sm={16} xs={24}>
              <TitleUI text="Danh sách phiếu thuyên chuyển đã tạo" level={2} />
            </Col>

            <Col
              xl={8}
              lg={8}
              md={8}
              sm={8}
              xs={24}
              className="d-flex justify-content-flex-end"
            >
              <ButtonUI
                color="success"
                icon={<PlusCircleOutlined />}
                text="Tạo phiếu mới"
                onClick={handleAdd}
              />
            </Col>

            <Table
              className="w-100 mt-3"
              dataSource={lstData}
              pagination={false}
              scroll={{ y: 360 }}
              columns={[]}
              rowKey="index"
            />
          </Row>
        </Form>
      </Space>

      <ModalConfirm
        visible={showAdd}
        setVisible={setShowAdd}
        handleConfirm={handleConfirm}
        handleCancel={handleCancelAdd}
        title={"Tạo phiếu thuyên chuyển"}
        width={600}
        divider
      >
        <React.Fragment>
          <Form
            form={form}
            layout="inline"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            className="form-row-gap-1"
            onFinish={handleFinish}
          >
            <Form.Item
              className="w-100"
              name="transfertype"
              label={<TextUI strong text="Loại đăng ký" />}
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống trường này!",
                },
              ]}
            >
              <Select
                className="w-100 min-width-100px"
                placeholder="Chọn loại đăng ký"
                onChange={onChangeType}
              >
                <Option value={1}>{"Thuyên chuyển siêu thị"}</Option>
                <Option value={2}>{"Thuyên chuyển phòng ban"}</Option>
              </Select>
            </Form.Item>

            {transferType === 1 ? (
              <Form.Item
                name="new"
                label={<TextUI strong text="Siêu thị mới" />}
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống trường này!",
                  },
                ]}
              >
                <SelectBase
                  placeholder="Chọn siêu thị"
                  requesting={requestingInit}
                  data={lstSt}
                />
              </Form.Item>
            ) : (
              <Form.Item
                name="new"
                label={<TextUI strong text="Phòng ban mới" />}
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống trường này!",
                  },
                ]}
              >
                <SelectBase
                  placeholder="Chọn phòng ban"
                  requesting={requestingInit}
                  data={lstDpm}
                />
              </Form.Item>
            )}

            <Form.Item
              name="reason"
              label={<TextUI strong text="Lý do thuyên chuyển" />}
              rules={[
                { required: true, message: "Không được bỏ trống trường này!" },
              ]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Nhập lý do thuyên chuyển ..."
              />
            </Form.Item>
          </Form>
        </React.Fragment>
      </ModalConfirm>
    </React.Fragment>
  ) : (
    <LoadingFullWidth />
  );
}

export default TransferManage;
