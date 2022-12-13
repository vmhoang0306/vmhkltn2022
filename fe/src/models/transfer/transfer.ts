import { IDepartment } from "../department";
import { IEmployeeInfo } from "../employeeinfo/info";

export interface ITransfer {
  _id?: string;
  username?: IEmployeeInfo;
  currentdepartment?: IDepartment;
  newdepartment?: IDepartment;
  reason?: string;
  status?: number;
}
