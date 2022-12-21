import { ClockCircleOutlined, FileDoneOutlined } from "@ant-design/icons";
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
import { Utils } from "../../../utils";
import SelectBase from "../../common/components/SelectBase";
import LoadingFullWidth from "../../common/LoadingFullWidth";
import { AuthContext } from "../../Login/Context/AuthContext";

function TimekeepingManage() {
  const [form] = Form.useForm();
  const [formaddvacation] = Form.useForm();
  const today = new Date();
  const authInfo = useContext(AuthContext);
  const [lstHistory, setLstHistory] = useState<any>();
  const [requesting, setRequesting] = useState(false);

  const [showAddVacation, setShowAddVacation] = useState(false);
  const [requestingAddVacation, setRequestingAddVacation] = useState(false);

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
    const url = ApiConstants.timekeeping.getlisttimekeeping;
    const params = { username: authInfo.username };

    setRequesting(true);
    const res: any = await axios.get(url, { params });
    setRequesting(false);

    if (res.data.status === "success") {
      setLstHistory(res.data.data);
    } else {
      console.log(res.data.message);
      Notify.error(
        "",
        res.data.message && res.status === 200
          ? res.data.message
          : "Xảy ra lỗi!"
      );
      setRequesting(false);
    }
  };

  //giờ bắt đầu chấm công
  const STARTTIME = 8;
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
              ""
            ) : record.ischeck ? (
              <Tag color="success">Đã chấm công</Tag>
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
    },
  ];

  const CalculateTimekeeping = () => {
    const hour = Utils.date.getHour(today);
    const minute = Utils.date.getMinute(today);
    if (hour <= ENDTIME && hour >= STARTTIME) {
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

  const handleTimekeeping = () => {
    form.submit();
  };
  const handleFinish = async () => {
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
  const handleFinishAddVacation = async () => {};

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
                  italic
                  className="d-flex justify-content-center txt-success"
                  text={`Tổng số giờ công: 7/8.0`}
                />
              </Space>
            </Space>

            <Col span={24} className="d-flex justify-content-flex-end">
              <ButtonUI
                className="me-1"
                color="warning"
                icon={<FileDoneOutlined />}
                text="Danh sách đăng ký nghỉ phép"
                onClick={handleVacation}
              />

              <ButtonUI
                icon={<FileDoneOutlined />}
                text="Đăng ký nghỉ phép"
                onClick={handleVacation}
              />
            </Col>

            <Table
              className="w-100 mt-3"
              dataSource={lstHistory}
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
    </React.Fragment>
  ) : (
    <LoadingFullWidth />
  );
}

export default TimekeepingManage;
