import { createContext } from 'react';

export const AuthContext = createContext({
  userinfo: null,
  login: () => {},
  logout: () => {},
});
