import { createContext } from 'react';

export const AuthContext = createContext({
  username: "",
  login: (_uid: string) => {},
  logout: () => {},
});
