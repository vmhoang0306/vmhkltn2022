import { createContext } from "react";

export const AuthContext = createContext({
  username: "",
  isTimekeeping: false,
  checkTimekeeping: (_uid: string, _hour: any, _date: any) => {},
  login: (_uid: string) => {},
  logout: () => {},
});
