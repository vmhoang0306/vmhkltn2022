import { createContext } from "react";

export const AuthContext = createContext({
  username: "",
  ismanager: false,
  isTimekeeping: false,
  checkTimekeeping: (_uid: string, _hour: any, _date: any) => {},
  login: (_uid: string) => {},
  logout: () => {},
});
