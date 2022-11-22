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

  const listTreeMenu = [
    getItem(
      <Link to={PAGE_URL.EMPLOYEEINFO}>Thông tin nhân viên</Link>,
      "employeeinfo",
      null,
      null,
      null
    ),
    getItem(
      "test1",
      "test1",
      null,
      [
        getItem("test2", "test2", null, null, null),
        getItem("test3", "test3", null, null, null),
        getItem("test4", "test4", null, null, null),
      ],
      null
    ),
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
          items={listTreeMenu}
        />
      ) : (
        <>
          <Menu
            id="menuFeature"
            items={listTreeMenu}
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
