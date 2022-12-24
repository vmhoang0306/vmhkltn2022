import { useContext } from "react";
import NotPermission from "../../common/NotPermission";
import { AuthContext } from "../../Login/Context/AuthContext";
import EmployeeManage from "../Components/EmployeeManage";

function EmployeeManagePage() {
  const authInfo = useContext(AuthContext);

  return authInfo.ismanager ? <EmployeeManage /> : <NotPermission />;
}

export default EmployeeManagePage;
