export interface IEmployeeInfo {
  _id?: string;
  username?: string;
  password?: string;
  contact?: {
    email?: string;
    phonenumber?: string;
  };
  dateofbirth?: string;
  identitycardid?: string;
  socialinsuranceid?: string;
  startdatework?: string;
  enddatework?: string;
  taxcode?: string;
  salary?: number;
  isactive?: boolean;
  createduser?: string;
  createddate?: string;
  updateduser?: string;
  updateddate?: string;
  deleteduser?: string;
  deleteddate?: string;
  department?: {
    _id?: string;
    departmentname?: string;
    isactive?: boolean;
  };
}
