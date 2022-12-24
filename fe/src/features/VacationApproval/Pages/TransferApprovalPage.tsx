import { useContext } from "react";
import NotPermission from "../../common/NotPermission";
import { AuthContext } from "../../Login/Context/AuthContext";
import VacationApprovalManage from "../Components/VacationApprovalManage";

function VacationApprovalPage() {
  const authInfo = useContext(AuthContext);

  return authInfo.ismanager ? <VacationApprovalManage /> : <NotPermission />;
}

export default VacationApprovalPage;
