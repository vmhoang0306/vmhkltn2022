import { EyeOutlined, UpCircleOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ButtonUI, TextUI } from "../../../components/general";
import { ModalConfirm } from "../../../components/modules";
import { ApiConstants } from "../../../constant";
import { Notify } from "../../../helpers";
import { Utils } from "../../../utils";

interface IProps {
  username: string;
  fullname: string;
  getlist: () => void;
}

function DetailTimekeepingBtn(props: IProps) {
  const { username, fullname, getlist } = props;

  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState<any>();
  const [requesting, setRequesting] = useState(false);
  const [isGetHistory, setIsGetHistory] = useState(false);

  const [idUpdate, setIdUpdate] = useState<string>();
  const [isUpdated, setIsUpdated] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [requestingUpdate, setRequestingUpdate] = useState(false);

  useEffect(() => {
    if (isGetHistory) {
      setShowModal(true);
    }
  }, [isGetHistory]);

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
              <Tag color="success">Đã đăng ký nghỉ phép</Tag>
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
    {
      title: <TextUI strong text="#" />,
      dataIndex: "#",
      key: "#",
      render: (_text: string, record: any) => {
        return (
          <>
            {Utils.date.getDay(record.date) !== "Chủ nhật" && (
              <ButtonUI
                icon={<UpCircleOutlined />}
                text="Kéo công"
                onClick={() => {
                  setIdUpdate(record._id);
                  setShowUpdate(true);
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

  const handleCancelModal = () => {
    setShowModal(false);
    setRequesting(false);
    setIsGetHistory(false);
    if (isUpdated) {
      getlist();
    }
    setIsUpdated(false);
  };
  const initData = async () => {
    const params = { username: username };
    const url = ApiConstants.timekeeping.getlist;

    setRequesting(true);
    const res: any = await axios.get(url, { params });
    setRequesting(false);

    if (res.data.status === "success") {
      setData(res.data.data);
      setIsGetHistory(true);
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

  const handleCancelUpdate = () => {
    setShowUpdate(false);
    setRequestingUpdate(false);
    setIdUpdate(undefined);
  };
  const handleConfirmUpdate = async () => {
    const url = ApiConstants.timekeeping.updatehour;
    const data = { _id: idUpdate };

    setRequestingUpdate(true);
    const res: any = await axios.post(url, data);
    setRequestingUpdate(false);

    if (res.data.status === "success") {
      Notify.success("", res.data.message ? res.data.message : "Đã kéo công!");
      setIsUpdated(true);
      initData();
      handleCancelUpdate();
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
      <ButtonUI
        icon={<EyeOutlined />}
        text="Chi tiết công"
        loading={requesting}
        onClick={initData}
      />

      <ModalConfirm
        divider
        visible={showModal}
        setVisible={setShowModal}
        title={`Chi tiết chấm công nhân viên: ${username}-${fullname}`}
        showButtonConfirm={false}
        textCancel="Trở lại"
        handleCancel={handleCancelModal}
        width={1024}
      >
        <React.Fragment>
          <Table
            className="w-100 mt-3"
            dataSource={data}
            pagination={false}
            columns={columns}
            rowKey="index"
          />
        </React.Fragment>
      </ModalConfirm>

      <ModalConfirm
        divider
        visible={showUpdate}
        setVisible={setShowUpdate}
        title={"Kéo công"}
        loadingBtnConfirm={requestingUpdate}
        handleConfirm={handleConfirmUpdate}
        handleCancel={handleCancelUpdate}
        width={600}
      >
        <React.Fragment>
          <TextUI
            text={`Xác nhận kéo ngày công cho nhân viên ${username}-${fullname}!`}
          />
        </React.Fragment>
      </ModalConfirm>
    </React.Fragment>
  );
}

export default DetailTimekeepingBtn;
