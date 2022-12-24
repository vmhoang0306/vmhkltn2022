import { useContext } from "react";
import NotPermission from "../../common/NotPermission";
import { AuthContext } from "../../Login/Context/AuthContext";
import TransferApprovalManage from "../Components/TransferApprovalManage";

function TransferApprovalPage() {
  const authInfo = useContext(AuthContext)

  return authInfo.ismanager ? <TransferApprovalManage /> : <NotPermission />;
}

export default TransferApprovalPage;
