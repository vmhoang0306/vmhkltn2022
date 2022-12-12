import { IDepartment, IPosition, IShift, IStore } from "../index";

export interface IEmployeeInfo {
  _id?: string;
  username?: string;
  fullname?: string;
  password?: string;
  contact?: {
    email?: string;
    phonenumber?: string;
  };
  gender?: number;
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
  createdAt?: string;
  updateduser?: string;
  updatedAt?: string;
  deleteduser?: string;
  department?: IDepartment;
  position?: IPosition;
  shift?: IShift;
  store?: IStore;
}

export interface IParamsSearch {
  keysearch?: string;
}

export interface IParamsSearchList {
  keysearch?: string;
  department?: string;
  position?: string;
  store?: string;
  shift?: string;
  isactive?: boolean;
  pagesize?: number;
  offset?: number;
}