import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ButtonUI, TextUI, TitleUI } from "../../../components/general";
import { ModalConfirm } from "../../../components/modules";
import { ApiConstants } from "../../../constant";
import { Notify } from "../../../helpers";
import { IDepartment, IEmployeeInfo, ITransfer } from "../../../models";
import SelectBase from "../../common/components/SelectBase";
import LoadingFullWidth from "../../common/LoadingFullWidth";
import { AuthContext } from "../../Login/Context/AuthContext";

function TransferManage() {
  const [form] = Form.useForm();
  const authInfo = useContext(AuthContext);

  const [lstData, setLstData] = useState<any[]>();
  const [userInfo, setUserInfo] = useState<IEmployeeInfo>();
  const [lstDpm, setLstDpm] = useState<any[]>([]);
  const [requestingInit, setRequestingInit] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [requestingAdd, setRequestingAdd] = useState(false);

  const [idDelete, setIdDelete] = useState<ITransfer>();
  const [showDelete, setShowDelete] = useState(false);
  const [requestingDelete, setRequestingDelete] = useState(false);

  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if ((!requestingAdd && showAdd) || (!requestingDelete && showDelete)) {
      getList(userInfo?._id!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestingAdd, requestingDelete]);

  const initData = async () => {
    const urlDpm = ApiConstants.department;
    const urlDetail = ApiConstants.employeeinfo.getbyid;
    const params = { username: authInfo.username };

    setRequestingInit(true);
    const dpm: any = await axios.get(urlDpm);
    const detail: any = await axios.get(urlDetail, { params });

    if (dpm.data.status === "success" && dpm.data.data?.length! > 0) {
      setLstDpm(formatDataDpm(dpm.data.data));
    }

    if (detail.data.status === "success" && dpm.data.data !== null) {
      getList(detail.data.data._id);
      setUserInfo(detail.data.data);
    }
    setRequestingInit(false);
  };

  const getList = async (_id: string) => {
    const urlGetList = ApiConstants.transfer.report.getlist;
    const params = { username: _id };
    const res: any = await axios.get(urlGetList, { params });
    if (res.data.status === "success") {
      setLstData(res.data.data);
    }
  };

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
      title: <TextUI strong text="Phòng ban" />,
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
            {record.status === -1 && <Tag color="yellow">Từ chối</Tag>}
            {record.status === 0 && <Tag color="yellow">Chờ duyệt</Tag>}
            {record.status === 1 && <Tag color="yellow">Duyệt 1</Tag>}
            {record.status === 2 && <Tag color="yellow">Duyệt 2</Tag>}
          </>
        );
      },
    },
    {
      title: (
        <TextUI className="d-flex justify-content-flex-end" strong text="#" />
      ),
      key: "#",
      render: (_text: string, record: ITransfer) => {
        return (
          <Space className="w-100 d-flex justify-content-flex-end">
            {record.status === 0 && (
              <ButtonUI
                color="danger"
                icon={<DeleteOutlined />}
                onClick={() => {
                  setIdDelete(record);
                  setShowDelete(true);
                }}
              />
            )}
          </Space>
        );
      },
      width: 50,
    },
  ];

  const formatDataDpm = (data: IDepartment[]) => {
    let results: { value: any; title: any }[] = [];
    data.forEach((item) => {
      results.push({ value: item._id, title: item.departmentname });
    });
    return results;
  };

  const handleCancelDelete = () => {
    setRequestingDelete(false);
    setShowDelete(false);
  };
  const handleConfirmDelete = async () => {
    const url = ApiConstants.transfer.report.delete;
    const data: { _id: string | undefined } = { _id: idDelete?._id };

    setRequestingDelete(true);
    const res: any = await axios.post(url, data);
    setRequestingDelete(false);

    if (res.data.data > 0) {
      Notify.success(
        "",
        res.data.message ? res.data.message : "Xóa phiếu thành công!"
      );
      handleCancelDelete();
    } else {
      Notify.error("", res.data.message ? res.data.message : "Xảy ra lỗi!");
    }
  };

  const handleCancelAdd = () => {
    setShowAdd(false);
    form.resetFields();
  };
  const handleAdd = () => {
    setShowAdd(true);
  };

  const handleConfirm = () => {
    form.submit();
  };

  const handleFinish = async (e: any) => {
    const newdepartment = e.new;

    if (newdepartment === userInfo?.department?._id) {
      Notify.warning("", "Vui lòng chọn phòng ban khác phòng ban hiện tại!");
      form.resetFields(["new"]);
    } else {
      const url = ApiConstants.transfer.report.create;
      const data = {
        username: userInfo?._id,
        currentdepartment: userInfo?.department?._id,
        newdepartment: newdepartment,
        reason: e.reason,
        status: 0,
      };

      setRequestingAdd(true);
      const res: any = await axios.post(url, data);
      setRequestingAdd(false);

      if (res.data.status === "success") {
        handleCancelAdd();
        Notify.success(
          "",
          res.data.message ? res.data.message : "Tạo phiếu thành công!"
        );
      } else {
        console.log(res.data.message);
        Notify.error(
          "",
          res.data.message && res.status === 200
            ? res.data.message
            : "Xảy ra lỗi!"
        );
      }
    }
  };

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
                loading={requestingAdd}
                onClick={handleAdd}
              />
            </Col>

            <Table
              className="w-100 mt-3"
              dataSource={lstData}
              pagination={false}
              scroll={{ y: 360 }}
              columns={columns}
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
        loadingBtnConfirm={requestingAdd}
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
              name="old"
              label={<TextUI strong text="Phòng ban hiện tại" />}
            >
              <Input
                disabled
                defaultValue={userInfo?.department!.departmentname!}
                className="w-100 min-width-100px"
                placeholder="Phòng ban hiện tại"
              />
            </Form.Item>

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
                isShowChooseAll={false}
              />
            </Form.Item>

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

      <ModalConfirm
        divider
        visible={showDelete}
        setVisible={setShowDelete}
        title={"Xóa phiếu"}
        handleConfirm={handleConfirmDelete}
        loadingBtnConfirm={requestingDelete}
        handleCancel={handleCancelDelete}
        width={768}
      >
        <TextUI text={"Phiếu thuyên chuyển này sẽ bị xóa!"} />
      </ModalConfirm>
    </React.Fragment>
  ) : (
    <LoadingFullWidth />
  );
}

export default TransferManage;
