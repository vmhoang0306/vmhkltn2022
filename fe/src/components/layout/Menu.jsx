import { MenuOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
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
    )
  ];

  const listMobile = [
    getItem(
      <span className="me-1">Quản lý thông tin nhân viên</span>,
      "employeeinfo",
      <UserOutlined />,
      menuEmployeeInfo,
      null
    ),
    getItem("test2", "test2", null, null, null),
    getItem("test3", "test3", null, null, null),
    getItem("test4", "test4", null, null, null),
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
          style={{ height: "100%", borderRight: 0, padding: 0}}
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
