import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userinfo: null,
  login: () => {},
  logout: () => {},
});
