import {
  ExportOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { Col, Form, Input, Row, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { ButtonUI, TextUI, TitleUI } from "../../../components/general";
import { ApiConstants } from "../../../constant";
import { Notify } from "../../../helpers";
import { IEmployeeInfo, IParamsSearchList } from "../../../models";
import LoadingFullWidth from "../../common/LoadingFullWidth";
import { AuthContext } from "../../Login/Context/AuthContext";
import DetailTimekeepingBtn from "./DetailTimekeepingBtn";

function TimekeepingMNGManage() {
  const [form] = Form.useForm();
  const authInfo = useContext(AuthContext);
  const today = new Date();

  const [lstData, setLstData] = useState<IEmployeeInfo[]>();
  const [requesting, setRequesting] = useState(false);
  const [info, setInfo] = useState<IEmployeeInfo>();

  const [requestingExport, setRequestingExport] = useState(false);

  useEffect(() => {
    form.setFieldsValue({ keysearch: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const initData = async () => {
      const url = ApiConstants.employeeinfo.getbyid;
      const params = { username: authInfo.username };

      setRequesting(true);
      const res: any = await axios.get(url, { params });
      setRequesting(false);

      if (res.data.status === "success") {
        setInfo(res.data.data);
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

    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: <TextUI strong text="Username" />,
      dataIndex: "username",
      key: "username",
      width: 125,
    },
    {
      title: <TextUI strong text="Họ tên" />,
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: <TextUI strong text="Số giờ công đã chấm" />,
      key: "checked",
      render: (_text: string, record: any) => {
        return <Tag color="blue">{record.checked!}</Tag>;
      },
      align: "center" as "center",
    },
    {
      title: <TextUI strong text="Tổng số giờ công" />,
      key: "total",
      render: (_text: string, record: any) => {
        return <Tag color="success">{record.total!}</Tag>;
      },
      align: "center" as "center",
    },
    {
      title: (
        <TextUI className="d-flex justify-content-flex-end" strong text="#" />
      ),
      key: "#",
      render: (_text: string, record: any) => {
        return (
          <>
            <DetailTimekeepingBtn
              username={record.username}
              fullname={record.fullname}
              getlist={handleSearch}
            />
          </>
        );
      },
      align: "right" as "right",
    },
  ];

  const handleSearch = () => {
    form.submit();
  };

  const handleFinish = async (e: IParamsSearchList) => {
    const url = ApiConstants.timekeeping.getlistformanager;
    const params: IParamsSearchList = {
      keysearch: e.keysearch,
      department: info?.department!._id,
      isactive: true,
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

  const handleFinishExport = async () => {
    const url = ApiConstants.timekeeping.getlistformanager;
    const params: IParamsSearchList = {
      keysearch: form.getFieldValue("keysearch"),
      department: info?.department!._id,
      isactive: true,
    };

    setRequestingExport(true);
    const res: any = await axios.get(url, { params });
    setRequestingExport(false);
    if (res.data.status === "success") {
      const filename = "Danh-sach-quan-ly-cong.xlsx";
      const header = [
        ["Danh sách quản lý công"],
        ["Tháng", today.getMonth() + 1 + "/" + today.getFullYear()],
        [],
        ["Username", "Họ tên", "Giờ công đã chấm", "Tổng số giờ công"],
      ];
      const data: any[] = res.data.data;

      const wb = XLSX.utils.book_new();
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.sheet_add_aoa(ws, header);
      XLSX.utils.sheet_add_json(ws, data, {
        origin: "A5",
        skipHeader: true,
      });
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, filename);
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

              <ButtonUI
                color="success"
                icon={<ExportOutlined />}
                text="Xuất Excel"
                className="ms-1"
                onClick={handleFinishExport}
                loading={requestingExport}
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
                columns={columns}
                rowKey="index"
              />
            )}
          </Row>
        </Form>
      </Space>
    </React.Fragment>
  );
}

export default TimekeepingMNGManage;
