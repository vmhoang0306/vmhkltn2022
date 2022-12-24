import { useContext } from "react";
import NotPermission from "../../common/NotPermission";
import { AuthContext } from "../../Login/Context/AuthContext";
import TimekeepingMNGManage from "../Components/TimekeepingMNGManage";

function TimekeepingManagePage() {
  const authInfo = useContext(AuthContext)

  return authInfo.ismanager ? <TimekeepingMNGManage /> : <NotPermission />;
}

export default TimekeepingManagePage;
