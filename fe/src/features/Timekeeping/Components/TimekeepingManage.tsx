import { ClockCircleOutlined } from "@ant-design/icons";
import { Form, Row, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import EmptyCardNoHeader from "../../../components/card/EmptyCardNoHeader";
import { ButtonUI, TextUI, TitleUI } from "../../../components/general";
import { AlertUI } from "../../../components/general/AlertUI";
import { ApiConstants } from "../../../constant";
import { Notify } from "../../../helpers";
import { Utils } from "../../../utils";
import LoadingFullWidth from "../../common/LoadingFullWidth";
import { AuthContext } from "../../Login/Context/AuthContext";

function TimekeepingManage() {
  const [form] = Form.useForm();
  const today = new Date();
  const authInfo = useContext(AuthContext);
  const [lstHistory, setLstHistory] = useState<any>();
  const [requesting, setRequesting] = useState(false);

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
            {record.ischeck ? (
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

                    {!authInfo.isTimekeeping && (
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
    </React.Fragment>
  ) : (
    <LoadingFullWidth />
  );
}

export default TimekeepingManage;
