// import MenuTreeList from 'features/common/components/menu/MenuTreeList';
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer, Tooltip } from "antd";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PAGE_URL } from "../../constant/route";
import { AuthContext } from "../../features/Login/Context/AuthContext";
import { TextUI } from "../general";
import { ModalConfirm } from "../modules";
import MenuComponent from "./Menu";

const HeaderComponent = () => {
  const [visible, setVisible] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const authInfo = useContext(AuthContext);

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    setShowConfirm(true);
  };

  const handleLogout = () => {
    authInfo.logout(authInfo.userinfo);
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="custom-header nav min-height-50px">
      <div className="nav-logo">
        <div className="nav-btn-open-sidebar" onClick={showDrawer}>
          <MenuOutlined style={{ fontSize: "30px" }} />
        </div>
        <Link to={PAGE_URL.HOME}>
          <img
            height="33"
            width="170"
            src="https://newinsite.thegioididong.com/content/bcnb2019/images/logo.png"
            alt="logo"
          />
        </Link>
      </div>

      <div className="nav-feature">
        <MenuComponent closeMenu={() => onClose()} mode="horizontal" />
      </div>

      <Tooltip placement="bottomRight" title="Đăng xuất" color="#e74040">
        <LogoutOutlined style={{ color: "#fff" }} onClick={handleConfirm} />
      </Tooltip>

      <Drawer
        title="Menu các chức năng"
        placement="left"
        onClose={onClose}
        visible={visible}
        zIndex={10}
        width={350}
      >
        <MenuComponent closeMenu={() => onClose()} mode="inline" />
      </Drawer>
      <ModalConfirm
        divider
        setVisible={setShowConfirm}
        visible={showConfirm}
        width={600}
        htmlTypeBtnConfirm="button"
        handleConfirm={() => handleLogout()}
        handleCancel={handleCancel}
        children={<TextUI text="Đăng xuất khỏi trang!" />}
      />
    </div>
  );
};

export default HeaderComponent;
