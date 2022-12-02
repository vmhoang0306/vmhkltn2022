export interface IEmployeeInfo {
  _id?: string;
  username?: string;
  fullname?: string;
  password?: string;
  contact?: {
    email?: string;
    phonenumber?: string;
  };
  sex?: number;
  dateofbirth?: string;
  identitycardid?: string;
  socialinsuranceid?: string;
  startdatework?: string;
  enddatework?: string;
  reason?: string;
  taxcode?: string;
  salary?: number;
  isactive?: boolean;
  createduser?: string;
  createddate?: string;
  updateduser?: string;
  updateddate?: string;
  deleteduser?: string;
  deleteddate?: string;
  department?: any;
  position?: any;
  shift?: any;
  store?: any;
}

export interface IParamsSearch {
  keysearch?: string;
}
