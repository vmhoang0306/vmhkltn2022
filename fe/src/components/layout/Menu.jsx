import {
  ClockCircleOutlined,
  EditOutlined,
  FileDoneOutlined, FileSyncOutlined, MenuOutlined,
  ReloadOutlined,
  SearchOutlined,
  SolutionOutlined,
  SyncOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { PAGE_URL } from "../../constant/route";

function MenuComponent(props) {
  const { closeMenu, mode } = props;

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const menuEmployeeInfo = [
    getItem(
      <Link to={PAGE_URL.EMPLOYEEINFO.FIND}>Tìm kiếm nhân viên</Link>,
      "employeeinfo/find",
      <SearchOutlined />,
      null,
      null
    ),
    getItem(
      <Link to={PAGE_URL.EMPLOYEEINFO.INFO}>Thông tin nhân viên</Link>,
      "employeeinfo/info",
      <UserOutlined />,
      null,
      null
    ),
    getItem(
      <Link to={PAGE_URL.EMPLOYEEINFO.MANAGE}>Danh sách nhân viên</Link>,
      "employeeinfo/manage",
      <SolutionOutlined />,
      null,
      null
    ),
  ];

  const menuTimekeeping = [
    getItem(
      <Link to={PAGE_URL.TIMEKEEPING.TIMEKEEPING}>Chấm công/Đăng ký nghỉ phép</Link>,
      "timekeeping/timekeeping",
      <ClockCircleOutlined />,
      null,
      null
    ),
    getItem(
      <Link to={PAGE_URL.TIMEKEEPING.MANAGE}>Quản lý công</Link>,
      "timekeeping/manage",
      <FileDoneOutlined />,
      null,
      null
    ),
  ];

  const menuTransfer = [
    getItem(
      <Link to={PAGE_URL.TRANSFER.TRANSFER}>Đăng ký thuyên chuyển</Link>,
      "transfer/transfer",
      <SyncOutlined />,
      null,
      null
    ),
    getItem(
      <Link to={PAGE_URL.TRANSFER.MANAGE}>Quản lý thuyên chuyển</Link>,
      "transfer/manage",
      <FileSyncOutlined />,
      null,
      null
    ),
  ];

  const listMobile = [
    getItem(
      <span className="me-2">Quản lý thông tin nhân viên</span>,
      "employeeinfo",
      <UserOutlined />,
      menuEmployeeInfo,
      null
    ),
    getItem(
      <span className="me-2">Quản lý giờ công/nghỉ phép</span>,
      "timekeeping",
      <ClockCircleOutlined />,
      menuTimekeeping,
      null
    ),
    getItem(
      <span className="me-2">Quản lý thuyên chuyển</span>,
      "transfer",
      <SyncOutlined />,
      menuTransfer,
      null
    ),
    getItem(
      <Link to={PAGE_URL.VACATION.MANAGE}>Quản lý đăng ký nghỉ phép</Link>,
      "vacation",
      <EditOutlined />,
      null,
      null
    ),
    getItem(
      <Link to={PAGE_URL.CHANGEPASS}>Thay đổi mật khẩu</Link>,
      "changepass",
      <ReloadOutlined />,
      null,
      null
    ),
  ];

  const listWeb = [
    getItem("Menu chức năng", "menu", <MenuOutlined />, listMobile, null),
  ];

  return (
    <React.Fragment>
      {mode === "horizontal" ? (
        <Menu
          className="w-100"
          id="menuFeature"
          mode={mode}
          onClick={closeMenu}
          style={{ height: "100%", borderRight: 0, padding: 0 }}
          items={listWeb}
        />
      ) : (
        <>
          <Menu
            id="menuFeature"
            items={listMobile}
            onClick={closeMenu}
            mode={mode}
            style={{ height: "100%", borderRight: 0, padding: 5 }}
          />
        </>
      )}
    </React.Fragment>
  );
}

export default MenuComponent;
