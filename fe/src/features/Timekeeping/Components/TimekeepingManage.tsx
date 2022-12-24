import {
  ClockCircleOutlined,
  DeleteOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Col, DatePicker, Form, Input, Row, Space, Table, Tag } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import EmptyCardNoHeader from "../../../components/card/EmptyCardNoHeader";
import { ButtonUI, TextUI, TitleUI } from "../../../components/general";
import { AlertUI } from "../../../components/general/AlertUI";
import { ModalConfirm } from "../../../components/modules";
import { ApiConstants } from "../../../constant";
import { Notify } from "../../../helpers";
import { IEmployeeInfo } from "../../../models";
import { Utils } from "../../../utils";
import SelectBase from "../../common/components/SelectBase";
import LoadingFullWidth from "../../common/LoadingFullWidth";
import { AuthContext } from "../../Login/Context/AuthContext";

function TimekeepingManage() {
  const [form] = Form.useForm();
  const [formaddvacation] = Form.useForm();
  const today = new Date();
  const authInfo = useContext(AuthContext);
  const [lstApprovedUser, setLstApprovedUser] = useState<any>();
  const [lstTimekeepingHistory, setLstTimekeepingHistory] = useState<any[]>([]);
  const [requesting, setRequesting] = useState(false);

  const [showAddVacation, setShowAddVacation] = useState(false);
  const [requestingAddVacation, setRequestingAddVacation] = useState(false);

  const [isGetHistory, setIsGetHistory] = useState(false);
  const [showVacationHistory, setShowVacationHistory] = useState(false);
  const [requestingVacationHistory, setRequestingVacationHistory] =
    useState(false);
  const [lstVacationHistory, setLstVacationHistory] = useState<any>();

  const [idDeleteVacation, setIdDeleteVacation] = useState<string>();
  const [showDeleteVacationHistory, setShowDeleteVacationHistory] =
    useState(false);
  const [requestingDeleteVacationHistory, setRequestingDeleteVacationHistory] =
    useState(false);

  useEffect(() => {
    if (isGetHistory) {
      setShowVacationHistory(true);
    }
  }, [isGetHistory]);

  useEffect(() => {
    if (showAddVacation) {
      formaddvacation.setFieldsValue({
        fromdate: dayjs(Utils.date.formatDateInput(today), "YYYY-MM-DD"),
        todate: dayjs(Utils.date.formatDateInput(today), "YYYY-MM-DD"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddVacation]);

  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initData = async () => {
    const params = { username: authInfo.username };

    const urlInfo = ApiConstants.employeeinfo.getbyid;
    const urlApprove = ApiConstants.vacation.getapproveduser;

    setRequesting(true);
    const info: any = await axios.get(urlInfo, { params });
    if (info.data.status === "success") {
      const department = info.data.data.department._id;
      const params = { department: department, username: authInfo.username };
      const appUser: any = await axios.get(urlApprove, { params });

      if (appUser.data.status === "success") {
        setLstApprovedUser(formatDataApprovedUser(appUser.data.data));
      }
    } else {
      console.log(info.data.message);
      Notify.error(
        "",
        info.data.message && info.status === 200
          ? info.data.message
          : "Xảy ra lỗi!"
      );
    }
    getLstTimekeeping();
    setRequesting(false);
  };

  const getLstTimekeeping = async () => {
    const params = { username: authInfo.username };
    const url = ApiConstants.timekeeping.getlist;
    const res: any = await axios.get(url, { params });
    if (res.data.status === "success") {
      setLstTimekeepingHistory(res.data.data);
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

  //giờ bắt đầu chấm công
  // const STARTTIME = 8;
  //giờ kết thúc chấm công
  const ENDTIME = 17;

  const columns = [
    {
      title: <TextUI strong text="Thứ" />,
      dataIndex: "date",
      key: "date",
      render: (_text: string, record: any) => {
        return <TextUI text={Utils.date.getDay(record.date)!} />;
      },
      width: 100,
      align: "center" as "center",
    },
    {
      title: <TextUI strong text="Ngày chấm" />,
      dataIndex: "date",
      key: "date",
      render: (_text: string, record: any) => {
        return <TextUI text={Utils.date.formatDate(record.date)!} />;
      },
      width: 200,
    },
    {
      title: <TextUI strong text="Thông tin" />,
      dataIndex: "ischeck",
      key: "ischeck",
      render: (_text: string, record: any) => {
        return (
          <>
            {new Date(record.date).getDay() === 0 ? (
              "--"
            ) : record.isvacation ? (
              <Tag color="blue">Đã đăng ký nghỉ phép</Tag>
            ) : record.ischeck ? (
              <Tag color="success">Đã chấm công</Tag>
            ) : record.hour > 0 ? (
              <Tag color="warning">Quản lý kéo công</Tag>
            ) : (
              <Tag color="error">Không chấm công</Tag>
            )}
          </>
        );
      },
    },
    {
      title: <TextUI strong text="Số giờ công" />,
      dataIndex: "hour",
      key: "hour",
      width: 125,
      render: (_text: string, record: any) => {
        return (
          <>
            {new Date(record.date).getDay() === 0 ? (
              "--"
            ) : (
              <TextUI text={record.hour} />
            )}
          </>
        );
      },
    },
  ];

  const columnsVacation = [
    {
      title: <TextUI strong text="STT" />,
      dataIndex: "index",
      key: "index",
      render: (_text: string, _record: any, index: any) => {
        return index + 1;
      },
      width: 60,
    },
    {
      title: <TextUI strong text="Loại phép" />,
      dataIndex: "vacationtype",
      key: "vacationtype",
      render: (_text: string, record: any) => {
        return (
          <>
            {record.vacationtype === 1 && (
              <Tag color="blue">Phép thường niên</Tag>
            )}
            {record.vacationtype === 2 && (
              <Tag color="pink">Phép không lương</Tag>
            )}
          </>
        );
      },
    },
    {
      title: <TextUI strong text="Từ ngày" />,
      dataIndex: "fromdate",
      key: "fromdate",
      render: (_text: string, record: any) => {
        return <TextUI text={Utils.date.formatDate(record.fromdate)!} />;
      },
    },
    {
      title: <TextUI strong text="Đến ngày" />,
      dataIndex: "fromdate",
      key: "fromdate",
      render: (_text: string, record: any) => {
        return <TextUI text={Utils.date.formatDate(record.todate)!} />;
      },
    },
    {
      title: <TextUI strong text="Lý do" />,
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: <TextUI strong text="Trạng thái" />,
      dataIndex: "status",
      key: "status",
      render: (_text: string, record: any) => {
        return (
          <>
            {record.status === 0 && <Tag color="warning">Chờ duyệt</Tag>}
            {record.status === 1 && <Tag color="success">Đã duyệt</Tag>}
            {record.status === -1 && <Tag color="error">Từ chối</Tag>}
            {!Utils.string.isNullOrEmpty(record.noteapprove) && (
              <Space className="w-100">
                <TextUI text={`Lý do: ${record.noteapprove}`} />
              </Space>
            )}
          </>
        );
      },
    },
    {
      title: <TextUI strong text="#" />,
      dataIndex: "#",
      key: "#",
      render: (_text: string, record: any) => {
        return (
          <>
            {record.status === 0 && (
              <ButtonUI
                color="danger"
                icon={<DeleteOutlined />}
                onClick={() => {
                  setIdDeleteVacation(record._id);
                  setShowDeleteVacationHistory(true);
                }}
              />
            )}
          </>
        );
      },
      align: "right" as "right",
      width: 60,
    },
  ];

  const formatDataApprovedUser = (data: IEmployeeInfo[]) => {
    let results: { value: any; title: any }[] = [];
    data.forEach((item) => {
      results.push({
        value: item.username,
        title: item.username + "-" + item.fullname,
      });
    });
    return results;
  };

  const CalculateTimekeeping = () => {
    const hour = Utils.date.getHour(today);
    const minute = Utils.date.getMinute(today);
    if (hour <= ENDTIME) {
      const time = hour + minute / 60;
      let timekeeping;

      if (hour <= 12) {
        timekeeping = ENDTIME - 1 - time;
      } else {
        timekeeping = ENDTIME - time;
      }

      return timekeeping >= 7.5 ? 8 : timekeeping.toFixed(2);
    }
    return 0;
  };

  const CalculateTotal = () => {
    let total: number = 0;
    lstTimekeepingHistory.forEach((item: any) => {
      if (new Date(item.date).getDay() !== 0) {
        total += 8;
      }
    });

    return total;
  };

  const CalculateChecked = () => {
    let checked: number = 0;
    lstTimekeepingHistory.forEach((item: any) => {
      if (new Date(item.date).getDay() !== 0) {
        checked += item.hour;
      }
    });

    return checked.toFixed(2);
  };

  const handleTimekeeping = () => {
    form.submit();
  };
  const handleFinish = async () => {
    getLstTimekeeping();
    authInfo.checkTimekeeping(authInfo.username, CalculateTimekeeping(), today);
  };

  const handleCancelAddVacation = () => {
    formaddvacation.resetFields();
    setShowAddVacation(false);
    setRequestingAddVacation(false);
  };
  const handleVacation = () => {
    setShowAddVacation(true);
  };
  const handleConfirmAddVacation = () => {
    formaddvacation.submit();
  };
  const handleFinishAddVacation = async (e: any) => {
    const url = ApiConstants.vacation.create;
    const data: any = {
      username: authInfo.username,
      vacationtype: e.vacationtype,
      fromdate: Utils.date.formatDateInput(e.fromdate),
      todate: Utils.date.formatDateInput(e.todate),
      reason: e.reason,
      approveduser: e.approveduser,
    };

    setRequestingAddVacation(true);
    const res: any = await axios.post(url, data);
    setRequestingAddVacation(false);

    if (res.data.data > 0) {
      Notify.success(
        "",
        res.data.message ? res.data.message : "Đăng ký nghỉ phép thành công!"
      );
      handleCancelAddVacation();
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

  const handleCancelVacationHistory = () => {
    setShowVacationHistory(false);
    setRequestingVacationHistory(false);
    setIsGetHistory(false);
  };
  const handleVacationHistory = async () => {
    const url = ApiConstants.vacation.getlist;
    const params = { username: authInfo.username };

    setRequestingVacationHistory(true);
    const res: any = await axios.get(url, { params });
    setRequestingVacationHistory(false);

    if (res.data.status === "success") {
      setIsGetHistory(true);
      setLstVacationHistory(res.data.data);
    } else {
      setLstVacationHistory([]);
      console.log(res.data.message);
      Notify.error(
        "",
        res.data.message && res.status === 200
          ? res.data.message
          : "Xảy ra lỗi!"
      );
    }
  };

  const handleCancelDeleteVacationHistory = () => {
    setShowDeleteVacationHistory(false);
    setRequestingDeleteVacationHistory(false);
    setIdDeleteVacation(undefined);
  };
  const handleConfirmDeleteVacationHistory = async () => {
    const url = ApiConstants.vacation.delete;
    const data = { _id: idDeleteVacation };

    setRequestingDeleteVacationHistory(true);
    const res: any = await axios.post(url, data);
    setRequestingDeleteVacationHistory(false);

    if (res.data.status === "success") {
      Notify.success(
        "",
        res.data.message ? res.data.message : "Đã hủy đăng ký phép!"
      );
      handleVacationHistory();
      handleCancelDeleteVacationHistory();
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

  return !requesting ? (
    <React.Fragment>
      <Space size={50} direction="vertical" className="w-100" wrap>
        <Form layout="vertical" className="form-row-gap-2">
          <Row className="d-flex justify-content-center align-items-center">
            <EmptyCardNoHeader
              isRadius={true}
              isShadow={true}
              className={"w-100 max-width-450px min-width-300px"}
              children={
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleFinish}
                  className="form-row-gap-0"
                >
                  <Space
                    className="d-flex justify-content-center"
                    direction="vertical"
                  >
                    <TitleUI
                      text={Utils.date.formatDate(today)}
                      level={1}
                      className={`my-1 txt-${
                        authInfo.isTimekeeping ? "success" : "danger"
                      } txt-center`}
                    />
                    <AlertUI
                      type={authInfo.isTimekeeping ? "success" : "error"}
                      description={
                        <TitleUI
                          className={
                            authInfo.isTimekeeping
                              ? "txt-success"
                              : "txt-danger"
                          }
                          text={
                            authInfo.isTimekeeping
                              ? "Bạn đã chấm công hôm nay!"
                              : "Bạn chưa chấm công hôm nay!"
                          }
                        />
                      }
                      banner
                      showIcon={true}
                    />
                    {!authInfo.isTimekeeping && (
                      <>
                        <Space className="d-flex justify-content-space-between align-items-center">
                          <TextUI text="Bây giờ là:" />
                          <TitleUI level={2} text={Utils.date.getTime(today)} />
                        </Space>

                        <Space className="d-flex justify-content-space-between align-items-center">
                          <TextUI text="Quy đổi giờ công:" />
                          <TitleUI
                            level={2}
                            text={CalculateTimekeeping().toString()}
                          />
                        </Space>

                        <ButtonUI
                          icon={<ClockCircleOutlined />}
                          text={
                            Utils.date.getHour(today) > ENDTIME
                              ? "Ngoài giờ chấm công"
                              : "Chấm công"
                          }
                          onClick={handleTimekeeping}
                          className="w-100"
                          disabled={Utils.date.getHour(today) > ENDTIME}
                        />
                      </>
                    )}
                  </Space>
                </Form>
              }
            />
          </Row>

          <Row className="d-flex justify-content-center align-items-center">
            <Space>
              <Space className="px-1" direction="vertical">
                <TitleUI
                  className="d-flex justify-content-center text-align-center"
                  text="Lịch sử chấm công"
                  level={1}
                />
                <TextUI
                  strong
                  italic
                  className="d-flex justify-content-center txt-success"
                  text={`Tổng số giờ công: ${CalculateChecked()}/${CalculateTotal()}`}
                />
              </Space>
            </Space>

            <Col span={24} className="d-flex justify-content-flex-end">
              <ButtonUI
                className="me-1"
                color="warning"
                icon={<FileDoneOutlined />}
                text="Lịch sử đăng ký nghỉ phép"
                onClick={handleVacationHistory}
                loading={requestingVacationHistory}
              />

              <ButtonUI
                icon={<FileDoneOutlined />}
                text="Đăng ký nghỉ phép"
                onClick={handleVacation}
              />
            </Col>

            <Table
              className="w-100 mt-3"
              dataSource={lstTimekeepingHistory}
              pagination={false}
              scroll={{ y: 360 }}
              columns={columns}
              rowKey="index"
            />
          </Row>
        </Form>
      </Space>

      <ModalConfirm
        divider
        visible={showAddVacation}
        setVisible={setShowAddVacation}
        title={"Đăng ký nghỉ phép"}
        handleConfirm={handleConfirmAddVacation}
        loadingBtnConfirm={requestingAddVacation}
        handleCancel={handleCancelAddVacation}
        width={600}
      >
        <React.Fragment>
          <Form
            form={formaddvacation}
            layout="vertical"
            className="form-row-gap-1"
            onFinish={handleFinishAddVacation}
          >
            <Row gutter={[10, 0]}>
              <Col span={24}>
                <Form.Item
                  name="vacationtype"
                  label={<TextUI strong text="Loại phép" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <SelectBase
                    isShowChooseAll={false}
                    placeholder="Chọn loại phép"
                    data={[
                      { value: 1, title: "Nghỉ phép thường niên" },
                      { value: 2, title: "Nghỉ phép không lương" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name="fromdate"
                  label={<TextUI strong text="Từ ngày" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày bắt đầu nghỉ phép"
                    className="w-100 min-width-100px"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name="todate"
                  label={<TextUI strong text="Đến ngày" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày kết thúc nghỉ phép"
                    className="w-100 min-width-100px"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="approveduser"
                  label={<TextUI strong text="Người duyệt" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <SelectBase
                    isShowChooseAll={false}
                    placeholder="Chọn người duyệt"
                    data={lstApprovedUser}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="reason"
                  label={<TextUI strong text="Lý do nghỉ phép" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="Nhập lý do nghỉ phép ..."
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </React.Fragment>
      </ModalConfirm>

      <ModalConfirm
        divider
        visible={showVacationHistory}
        setVisible={setShowVacationHistory}
        title={"Lịch sử đăng ký nghỉ phép"}
        showButtonConfirm={false}
        textCancel="Trở lại"
        handleCancel={handleCancelVacationHistory}
        width={1024}
      >
        <React.Fragment>
          <Table
            className="w-100 mt-3"
            dataSource={lstVacationHistory}
            pagination={false}
            scroll={{ y: 480 }}
            columns={columnsVacation}
            rowKey="index"
          />
        </React.Fragment>
      </ModalConfirm>

      <ModalConfirm
        divider
        visible={showDeleteVacationHistory}
        setVisible={setShowDeleteVacationHistory}
        title={"Lịch sử đăng ký nghỉ phép"}
        loadingBtnConfirm={requestingDeleteVacationHistory}
        handleConfirm={handleConfirmDeleteVacationHistory}
        handleCancel={handleCancelDeleteVacationHistory}
        width={600}
      >
        <React.Fragment>
          <TextUI text="Xóa yêu cầu đăng ký nghỉ phép!" />
        </React.Fragment>
      </ModalConfirm>
    </React.Fragment>
  ) : (
    <LoadingFullWidth />
  );
}

export default TimekeepingManage;
