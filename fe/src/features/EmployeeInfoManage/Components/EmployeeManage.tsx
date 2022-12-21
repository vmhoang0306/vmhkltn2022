import {
  DeleteOutlined,
  ExportOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import {
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ButtonUI, TextUI, TitleUI } from "../../../components/general";
import { ModalConfirm } from "../../../components/modules";
import { ApiConstants } from "../../../constant";
import { Notify } from "../../../helpers";
import {
  IDepartment,
  IEmployeeInfo,
  IParamsSearchList,
  IPosition,
  IShift,
  IStore,
} from "../../../models";
import { Utils } from "../../../utils";
import SelectBase from "../../common/components/SelectBase";
import LoadingFullWidth from "../../common/LoadingFullWidth";
import { AuthContext } from "../../Login/Context/AuthContext";
import EditBtn from "./EditBtn";
import * as XLSX from "xlsx";

function EmployeeManage() {
  const [form] = Form.useForm();
  const [formadd] = Form.useForm();

  const [lstData, setLstData] = useState<IEmployeeInfo[]>();
  const [requesting, setRequesting] = useState(false);

  const [lstDpm, setLstDpm] = useState<any>([]);
  const [lstStore, setLstStore] = useState<any>([]);
  const [lstShift, setLstShift] = useState<any>([]);
  const [lstPosition, setLstPosition] = useState<any>([]);
  const [requestingInit, setRequestingInit] = useState(false);

  const [detail, setDetail] = useState<IEmployeeInfo>();
  const [showDetail, setShowDetail] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [requestingAdd, setRequestingAdd] = useState(false);

  const [idDelete, setIdDelete] = useState<IEmployeeInfo>();
  const [showDelete, setShowDelete] = useState(false);
  const [requestingDelete, setRequestingDelete] = useState(false);

  const [idRestore, setIdRestore] = useState<IEmployeeInfo>();
  const [showRestore, setShowRestore] = useState(false);
  const [requestingRestore, setRequestingRestore] = useState(false);

  const [requestingExport, setRequestingExport] = useState(false);

  const NO_DATA = "-Chưa có dữ liệu-";

  const authInfo = useContext(AuthContext);

  useEffect(() => {
    const initData = async () => {
      const urlDpm = ApiConstants.department;
      const urlSt = ApiConstants.store;
      const urlShift = ApiConstants.shift;
      const urlPst = ApiConstants.position;

      setRequestingInit(true);
      const dpm: any = await axios.get(urlDpm);
      const st: any = await axios.get(urlSt);
      const shift: any = await axios.get(urlShift);
      const pst: any = await axios.get(urlPst);
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
        setLstStore(formatDataStore(st.data.data));
      } else {
        Notify.error(
          "",
          st.data.message
            ? st.data.message
            : "Xảy ra lỗi khi lấy danh sách siêu thị!"
        );
      }

      if (shift.data.status === "success" && dpm.data.data?.length! > 0) {
        setLstShift(formatDataShift(shift.data.data));
      } else {
        Notify.error(
          "",
          shift.data.message
            ? shift.data.message
            : "Xảy ra lỗi khi lấy danh sách loại phân ca!"
        );
      }

      if (pst.data.status === "success" && dpm.data.data?.length! > 0) {
        setLstPosition(formatDataPosition(pst.data.data));
      } else {
        Notify.error(
          "",
          pst.data.message
            ? pst.data.message
            : "Xảy ra lỗi khi lấy danh sách vị trí!"
        );
      }
    };

    initData();
    form.setFieldsValue({ isactive: true });
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
      render: (_text: string, record: IEmployeeInfo) => {
        return (
          <TextUI
            text={record.fullname!}
            onClick={() => {
              setShowDetail(true);
              setDetail(record);
            }}
            className="hv-textui-link txt-primary txt-bold"
          />
        );
      },
    },
    {
      title: <TextUI strong text="Số điện thoại" />,
      key: "phonenumber",
      render: (_text: string, record: IEmployeeInfo) => {
        return <TextUI text={record.contact?.phonenumber!} />;
      },
      width: 125,
    },
    {
      title: <TextUI strong text="Phòng ban" />,
      key: "department",
      render: (_text: string, record: IEmployeeInfo) => {
        return <TextUI text={record.department?.departmentname!} />;
      },
    },
    {
      title: <TextUI strong text="Siêu thị" />,
      key: "store",
      render: (_text: string, record: IEmployeeInfo) => {
        return <TextUI text={record.store?.storename!} />;
      },
    },
    {
      title: <TextUI strong text="Trạng thái" />,
      dataIndex: "isactive",
      key: "isactive",
      render: (_text: string, record: IEmployeeInfo) => {
        return record.isactive ? (
          <Tag color="green">Đang hoạt động</Tag>
        ) : (
          <Tag color="red">Ngừng hoạt động</Tag>
        );
      },
    },
    {
      title: (
        <TextUI className="d-flex justify-content-flex-end" strong text="#" />
      ),
      key: "#",
      render: (_text: string, record: IEmployeeInfo) => {
        return (
          <Space className="w-100 d-flex justify-content-flex-end">
            {record.isactive ? (
              <>
                <EditBtn
                  idEdit={record}
                  getlist={() => {
                    form.submit();
                  }}
                  lstDpm={lstDpm}
                  lstPosition={lstPosition}
                  lstShift={lstShift}
                  lstStore={lstStore}
                />
                <ButtonUI
                  color="danger"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    setIdDelete(record);
                    setShowDelete(true);
                  }}
                />
              </>
            ) : (
              <ButtonUI
                color="violet"
                icon={<UndoOutlined />}
                onClick={() => {
                  setIdRestore(record);
                  setShowRestore(true);
                }}
              />
            )}
          </Space>
        );
      },
      width: 85,
    },
  ];

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
  const formatDataShift = (data: IShift[]) => {
    let results: { value: any; title: any }[] = [];
    data.forEach((item) => {
      results.push({ value: item._id, title: item.shiftname });
    });
    return results;
  };
  const formatDataPosition = (data: IPosition[]) => {
    let results: { value: any; title: any }[] = [];
    data.forEach((item) => {
      results.push({ value: item._id, title: item.positionname });
    });
    return results;
  };

  const handleCancelAdd = () => {
    setShowAdd(false);
    formadd.resetFields();
  };
  const handleConfirmAdd = () => {
    formadd.submit();
  };

  const handleFinishAdd = async (e: any) => {
    const url = ApiConstants.employeeinfo.create;
    const data: IEmployeeInfo = {
      username: e.username,
      fullname: e.fullname,
      password: Utils.enCode(e.username),
      contact: {
        email: e.email,
        phonenumber: e.phonenumber,
      },
      gender: e.gender,
      dateofbirth: e.dateofbirth,
      identitycardid: e.identitycardid,
      socialinsuranceid: e.socialinsuranceid,
      startdatework: e.startdatework,
      enddatework: "",
      reason: "",
      taxcode: e.taxcode,
      salary: 0,
      isactive: true,
      createduser: authInfo.username,
      updateduser: "",
      deleteduser: "",
      department: e.department,
      position: e.position,
      store: e.store,
      shift: e.shift,
    };

    setRequestingAdd(true);
    const res: any = await axios.post(url, data);
    setRequestingAdd(false);

    if (res.data.data > 0) {
      Notify.success(
        "",
        res.data.message
          ? res.data.message
          : "Thêm thông tin người dùng thành công!"
      );
      handleSearch();
      handleCancelAdd();
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

  const handleCancelDelete = () => {
    setRequestingDelete(false);
    setShowDelete(false);
  };
  const handleConfirmDelete = async () => {
    const url = ApiConstants.employeeinfo.delete;
    const data: { _id: string | undefined } = { _id: idDelete?._id };

    setRequestingDelete(true);
    const res: any = await axios.post(url, data);
    setRequestingDelete(false);

    if (res.data.data > 0) {
      Notify.success(
        "",
        res.data.message
          ? res.data.message
          : "Xóa thông tin người dùng thành công!"
      );
      handleSearch();
      handleCancelDelete();
    } else {
      Notify.error("", res.data.message ? res.data.message : "Xảy ra lỗi!");
    }
  };

  const handleCancelRestore = () => {
    setRequestingRestore(false);
    setShowRestore(false);
  };
  const handleConfirmRestore = async () => {
    const url = ApiConstants.employeeinfo.restore;
    const data: { _id: string | undefined } = { _id: idRestore?._id };

    setRequestingRestore(true);
    const res: any = await axios.post(url, data);
    setRequestingRestore(false);

    if (res.data.data > 0) {
      Notify.success(
        "",
        res.data.message
          ? res.data.message
          : "Khôi phục thông tin người dùng thành công!"
      );
      handleSearch();
      handleCancelRestore();
    } else {
      Notify.error("", res.data.message ? res.data.message : "Xảy ra lỗi!");
    }
  };

  const handleSearch = () => {
    form.submit();
  };

  const handleFinish = async (e: any) => {
    const url = ApiConstants.employeeinfo.search;
    const params: IParamsSearchList = {
      keysearch: e.keysearch,
      department: e.department,
      position: e.position,
      shift: e.shift,
      store: e.store,
      isactive: e.isactive,
    };

    setRequesting(true);
    const res: any = await axios.get(url, { params });
    setRequesting(false);

    if (res.data.status === "success") {
      setLstData(res.data.data);
    } else {
      Notify.error("", res.data.message ? res.data.message : "Xảy ra lỗi!");
    }
  };

  const handleFinishExport = async () => {
    const url = ApiConstants.employeeinfo.search;
    const params: IParamsSearchList = {
      keysearch: form.getFieldValue("keysearch"),
      department: form.getFieldValue("department"),
      position: form.getFieldValue("position"),
      shift: form.getFieldValue("shift"),
      store: form.getFieldValue("store"),
      isactive: form.getFieldValue("isactive"),
    };

    setRequestingExport(true);
    const res: any = await axios.get(url, { params });
    setRequestingExport(false);
    if (res.data.status === "success") {
      const filename = "Danh-sach-nhan-vien.xlsx";
      const header = [
        ["Danh sách nhân viên"],
        [],
        [
          "Username",
          "Họ tên",
          "Giới tính",
          "Số diện thoại",
          "Email",
          "Ngày sinh",
          "CCCD",
          "Ngày bắt đầu làm việc",
          "Ngày kết thúc làm việc",
          "Phòng ban",
          "Vị trí",
          "Siêu thị",
          "Loại phân ca",
        ],
      ];
      const data: any[] = [];
      res.data.data.forEach((item: IEmployeeInfo) => {
        data.push({
          username: item.username,
          fullname: item.fullname,
          gender: item.gender === 1 ? "Nam" : "Nữ",
          phonenumber: item.contact?.phonenumber,
          email: item.contact?.email,
          dateofbirth: Utils.date.formatDate(item.dateofbirth),
          identitycardid: item.identitycardid,
          startdatework: Utils.date.formatDate(item.startdatework),
          enddatework: Utils.string.isNullOrEmpty(item.enddatework)
            ? "-Chưa có dữ liệu-"
            : Utils.date.formatDate(item.enddatework),
          department: item.department?.departmentname,
          position: item.position?.positionname,
          store: item.store?.storename,
          shift: item.shift?.shiftname,
        });
      });
      const wb = XLSX.utils.book_new();
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.sheet_add_aoa(ws, header);
      XLSX.utils.sheet_add_json(ws, data, {
        origin: "A4",
        skipHeader: true,
      });
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, filename);
    }
  };

  return !requestingInit ? (
    <React.Fragment>
      <Space size={50} direction="vertical" className="w-100" wrap>
        <Form
          form={form}
          layout="vertical"
          className="form-row-gap-2"
          onFinish={handleFinish}
        >
          <Row
            className="d-flex justify-content-space-between align-items-center"
            gutter={[20, 0]}
          >
            <Col xl={6} lg={6} md={12} sm={12} xs={24}>
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

            <Col xl={6} lg={6} md={12} sm={12} xs={24}>
              <Form.Item name="department" label={<TitleUI text="Phòng ban" />}>
                <SelectBase
                  placeholder="Chọn phòng ban"
                  requesting={requestingInit}
                  data={lstDpm}
                />
              </Form.Item>
            </Col>

            <Col xl={6} lg={6} md={12} sm={12} xs={24}>
              <Form.Item name="store" label={<TitleUI text="Siêu thị" />}>
                <SelectBase
                  placeholder="Chọn siêu thị"
                  requesting={requestingInit}
                  data={lstStore}
                />
              </Form.Item>
            </Col>

            <Col xl={6} lg={6} md={12} sm={12} xs={24}>
              <Form.Item name="shift" label={<TitleUI text="Phân ca" />}>
                <SelectBase
                  placeholder="Chọn phân ca"
                  requesting={requestingInit}
                  data={lstShift}
                />
              </Form.Item>
            </Col>

            <Col xl={6} lg={6} md={12} sm={12} xs={24}>
              <Form.Item
                name="isactive"
                label={<TitleUI text="Trạng thái hoạt động" />}
              >
                <SelectBase
                  isShowChooseAll
                  defVal={true}
                  placeholder="Chọn trạng thái hoạt động"
                  data={[
                    { value: true, title: "Đang hoạt động" },
                    { value: false, title: "Ngừng hoạt động" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Row
              className="w-100 d-flex justify-content-flex-end"
              gutter={[0, 10]}
            >
              <ButtonUI
                icon={<SearchOutlined />}
                text="Tìm"
                onClick={handleSearch}
                className="ms-1"
                loading={requesting}
              />

              <ButtonUI
                color="warning"
                icon={<PlusCircleOutlined />}
                text="Tạo người dùng mới"
                onClick={() => {
                  setShowAdd(true);
                }}
                className="ms-1"
              />

              <ButtonUI
                color="success"
                icon={<ExportOutlined />}
                text="Xuất Excel"
                className="ms-1"
                onClick={handleFinishExport}
                loading={requestingExport}
              />
            </Row>

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
        visible={showDetail}
        setVisible={setShowDetail}
        title={`Thông tin nhân viên: ${detail?.username} - ${detail?.fullname}`}
        showButtonConfirm={false}
        textCancel={"Trở lại"}
        width={768}
      >
        <React.Fragment>
          <Row className="mx-1 d-flex justify-space-between" gutter={[0, 10]}>
            <Col span={24}>
              <Divider orientation="left" orientationMargin="0">
                <Space direction="horizontal">
                  <InfoCircleOutlined />
                  <TitleUI text="Thông tin cá nhân" />
                </Space>
              </Divider>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Ngày sinh: </span>
              {Utils.date.formatDate(detail?.dateofbirth)}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Số điện thoại: </span>
              {detail?.contact?.phonenumber}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Email: </span>
              {detail?.contact?.email}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Giới tính: </span>
              <Tag color={detail?.gender === 1 ? "blue" : "pink"}>
                {detail?.gender === 1 ? "Nam" : "Nữ"}
              </Tag>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Siêu thị: </span>
              {detail?.store?.storename}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Phòng ban: </span>
              {detail?.department?.departmentname}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Vị trí: </span>
              {detail?.position?.positionname}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Loại phân ca: </span>
              {detail?.shift?.shiftname}
            </Col>
          </Row>

          <Row className="d-flex justify-space-between" gutter={[0, 10]}>
            <Col span={24}>
              <Divider orientation="left" orientationMargin="0">
                <Space direction="horizontal">
                  <InfoCircleOutlined />
                  <TitleUI text="Thông tin công việc" />
                </Space>
              </Divider>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">CCCD: </span>
              <Tag color={"cyan"}>{"************"}</Tag>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Mã bảo hiểm xã hội: </span>
              <Tag color={"orange"}>{"************"}</Tag>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Mã số thuế: </span>
              <Tag color={"purple"}>{"************"}</Tag>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Trạng thái: </span>
              <Tag color={detail?.isactive ? "green" : "red"}>
                {detail?.isactive ? "Đang hoạt động" : "Dừng hoạt động"}
              </Tag>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Ngày vào làm: </span>
              {Utils.date.formatDate(detail?.startdatework)}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <span className="txt-bold">Ngày thôi việc: </span>
              {detail?.enddatework === null
                ? NO_DATA
                : Utils.date.formatDate(detail?.enddatework)}
            </Col>
          </Row>
        </React.Fragment>
      </ModalConfirm>

      <ModalConfirm
        visible={showAdd}
        setVisible={setShowAdd}
        title={"Tạo người dùng mới"}
        handleConfirm={handleConfirmAdd}
        loadingBtnConfirm={requestingAdd}
        handleCancel={handleCancelAdd}
        width={768}
      >
        <React.Fragment>
          <Form
            form={formadd}
            layout="vertical"
            className="form-row-gap-1"
            onFinish={handleFinishAdd}
          >
            <Row gutter={[10, 0]}>
              <Col span={24}>
                <Divider orientation="left" orientationMargin="0">
                  <Space direction="horizontal">
                    <InfoCircleOutlined />
                    <TitleUI text="Thông tin cá nhân" />
                  </Space>
                </Divider>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="username"
                  label={<TextUI strong text="Username" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <Input
                    className="w-100 min-width-100px"
                    placeholder="Nhập username"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="fullname"
                  label={<TextUI strong text="Họ tên" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <Input
                    className="w-100 min-width-100px"
                    placeholder="Nhập họ tên nhân viên"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="phonenumber"
                  label={<TextUI strong text="Số điện thoại" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <Input
                    className="w-100 min-width-100px"
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item name="email" label={<TextUI strong text="Email" />}>
                  <Input
                    className="w-100 min-width-100px"
                    placeholder="Nhập email"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="gender"
                  label={<TextUI strong text="Giới tính" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <SelectBase
                    isShowChooseAll={false}
                    placeholder="Chọn giới tính"
                    data={[
                      { value: 0, title: "Nữ" },
                      { value: 1, title: "Nam" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="dateofbirth"
                  label={<TextUI strong text="Ngày sinh" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày sinh"
                    className="w-100 min-width-100px"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="department"
                  label={<TextUI strong text="Phòng ban" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <SelectBase
                    isShowChooseAll={false}
                    placeholder="Chọn phòng ban"
                    data={lstDpm}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="store"
                  label={<TextUI strong text="Siêu thị" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <SelectBase
                    isShowChooseAll={false}
                    placeholder="Chọn siêu thị"
                    data={lstStore}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="position"
                  label={<TextUI strong text="Vị trí" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <SelectBase
                    isShowChooseAll={false}
                    placeholder="Chọn vị trí"
                    data={lstPosition}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="shift"
                  label={<TextUI strong text="Loại phân ca" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <SelectBase
                    isShowChooseAll={false}
                    placeholder="Chọn loại phân ca"
                    data={lstShift}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[10, 0]}>
              <Col span={24}>
                <Divider orientation="left" orientationMargin="0">
                  <Space direction="horizontal">
                    <InfoCircleOutlined />
                    <TitleUI text="Thông tin công việc" />
                  </Space>
                </Divider>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="identitycardid"
                  label={<TextUI strong text="CCCD" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <Input
                    className="w-100 min-width-100px"
                    placeholder="Nhập CCCD"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="socialinsuranceid"
                  label={<TextUI strong text="Mã bảo hiểm xã hội" />}
                >
                  <Input
                    className="w-100 min-width-100px"
                    placeholder="Nhập mã bảo hiểm xã hội"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="taxcode"
                  label={<TextUI strong text="Mã số thuế" />}
                >
                  <Input
                    className="w-100 min-width-100px"
                    placeholder="Nhập mã số thuế"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="startdatework"
                  label={<TextUI strong text="Ngày bắt đầu làm việc" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày bắt đầu làm việc"
                    className="w-100 min-width-100px"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </React.Fragment>
      </ModalConfirm>

      <ModalConfirm
        divider
        visible={showDelete}
        setVisible={setShowDelete}
        title={"Xóa người dùng"}
        handleConfirm={handleConfirmDelete}
        loadingBtnConfirm={requestingDelete}
        handleCancel={handleCancelDelete}
        width={768}
      >
        <TextUI
          text={`Xóa nhân viên ${idDelete?.username} - ${idDelete?.fullname} khỏi danh sách!`}
        />
      </ModalConfirm>

      <ModalConfirm
        divider
        visible={showRestore}
        setVisible={setShowRestore}
        title={"Xóa người dùng"}
        handleConfirm={handleConfirmRestore}
        loadingBtnConfirm={requestingRestore}
        handleCancel={handleCancelRestore}
        width={768}
      >
        <TextUI
          text={`Khôi phục viên ${idRestore?.username} - ${idRestore?.fullname}!`}
        />
      </ModalConfirm>
    </React.Fragment>
  ) : (
    <LoadingFullWidth />
  );
}

export default EmployeeManage;
