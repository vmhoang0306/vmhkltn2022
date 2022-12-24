import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import { Col, Form, Input, Row, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ButtonUI, TextUI } from "../../../components/general";
import { ModalConfirm } from "../../../components/modules";
import { ApiConstants } from "../../../constant";
import { Notify } from "../../../helpers";
import { ITransfer } from "../../../models";
import LoadingFullWidth from "../../common/LoadingFullWidth";
import { AuthContext } from "../../Login/Context/AuthContext";

function TransferApprovalManage() {
  const [form] = Form.useForm();
  const [formapprove] = Form.useForm();
  const authInfo = useContext(AuthContext);

  const [lstData, setLstData] = useState<any[]>();
  const [requesting, setRequesting] = useState(false);

  const [isOk, setIsOk] = useState<boolean>();
  const [idApprove, setIdApprove] = useState<string>();
  const [showConfirm, setShowConfirm] = useState(false);
  const [requestingApprove, setRequestingApprove] = useState(false);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: <TextUI strong text="Username" />,
      dataIndex: "username",
      key: "username",
      render: (_text: string, record: ITransfer) => {
        return <TextUI text={record.username?.username!} />;
      },
    },
    {
      title: <TextUI strong text="Họ tên" />,
      dataIndex: "fullname",
      key: "fullname",
      render: (_text: string, record: ITransfer) => {
        return <TextUI text={record.username?.fullname!} />;
      },
    },
    {
      title: <TextUI strong text="Phòng ban hiện tại" />,
      dataIndex: "currentdepartment",
      key: "currentdepartment",
      render: (_text: string, record: ITransfer) => {
        return <TextUI text={record.currentdepartment?.departmentname!} />;
      },
    },
    {
      title: <TextUI strong text="Phòng ban thuyên chuyển" />,
      key: "newdepartment",
      render: (_text: string, record: ITransfer) => {
        return <TextUI text={record.newdepartment?.departmentname!} />;
      },
    },
    {
      title: <TextUI strong text="Trạng thái" />,
      dataIndex: "status",
      key: "status",
      render: (_text: string, record: ITransfer) => {
        return (
          <>
            {record.status === -1 && <Tag color="error">Từ chối</Tag>}
            {record.status === 0 && <Tag color="warning">Chờ duyệt</Tag>}
            {record.status === 1 && <Tag color="success">Đã duyệt</Tag>}
          </>
        );
      },
    },
    {
      title: (
        <TextUI className="d-flex justify-content-flex-end" strong text="#" />
      ),
      key: "#",
      render: (_text: string, record: any) => {
        return (
          record.status === 0 && (
            <>
              <ButtonUI
                color="success"
                text="Duyệt"
                icon={<CheckCircleOutlined />}
                className="min-width-120px"
                onClick={() => {
                  setIsOk(true);
                  setShowConfirm(true);
                  setIdApprove(record._id);
                }}
              />
              <ButtonUI
                color="danger"
                text="Từ chối"
                icon={<CloseCircleOutlined />}
                className="min-width-120px mt-1"
                onClick={() => {
                  setIsOk(false);
                  setShowConfirm(true);
                  setIdApprove(record._id);
                }}
              />
            </>
          )
        );
      },
      align: "right" as "right",
    },
  ];

  const handleSearch = () => {
    form.submit();
  };

  const handleFinish = async () => {
    const url = ApiConstants.transfer.approve.getlistformanager;
    const params: any = {
      username: authInfo.username,
    };

    setRequesting(true);
    const res: any = await axios.get(url, { params });
    setRequesting(false);

    if (res.data.status === "success") {
      setLstData(res.data.data);
    } else {
      console.log(res.data.message);
      Notify.error(
        "",
        res.data.message && res.status === 200
          ? res.data.message
          : "Xảy ra lỗi!"
      );
    }
  };

  const handleCancelApprove = () => {
    setIsOk(undefined);
    setRequestingApprove(false);
    setShowConfirm(false);
    formapprove.resetFields();
  };
  const handleConfirmApprove = () => {
    formapprove.submit();
  };
  const handleFinishApprove = async (e: any) => {
    const url = ApiConstants.transfer.approve.approve;
    const data = {
      _id: idApprove,
      status: isOk ? 1 : -1,
      note: isOk ? "" : e.reason,
      approveduser: authInfo.username,
    };

    setRequestingApprove(true);
    const res: any = await axios.post(url, data);
    setRequestingApprove(false);

    if (res.data.status === "success") {
      Notify.success(
        "",
        res.data.message
          ? res.data.message
          : "Đã cập nhật trạng thái thuyên chuyển!"
      );
      handleSearch();
      handleCancelApprove();
    } else {
      console.log(res.data.message);
      Notify.error(
        "",
        res.data.message && res.status === 200
          ? res.data.message
          : "Xảy ra lỗi!"
      );
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
        divider
        visible={showConfirm}
        setVisible={setShowConfirm}
        title={"Duyệt đăng ký thuyên chuyển"}
        handleConfirm={handleConfirmApprove}
        loadingBtnConfirm={requestingApprove}
        handleCancel={handleCancelApprove}
        width={600}
      >
        <React.Fragment>
          <Form
            form={formapprove}
            layout="vertical"
            className="form-row-gap-1"
            onFinish={handleFinishApprove}
          >
            <Row gutter={[10, 0]}>
              {isOk ? (
                <TextUI text={"Duyệt đăng ký thuyên chuyển!"} />
              ) : (
                <Col span={24}>
                  <Form.Item
                    name="reason"
                    label={<TextUI strong text="Vui lòng nhập lý do từ chối" />}
                    rules={[
                      {
                        required: true,
                        message: "Không được bỏ trống trường này!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={3}
                      placeholder="Nhập lý do từ chối ..."
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Form>
        </React.Fragment>
      </ModalConfirm>
    </React.Fragment>
  );
}

export default TransferApprovalManage;
