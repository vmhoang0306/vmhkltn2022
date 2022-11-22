import { useCallback, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { PAGE_URL } from "./constant/route";
import { AuthContext } from "./features/Login/Context/AuthContext";
import LoginPage from "./features/Login/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<any>();

  const login = useCallback((uid: any) => {
    setIsLoggedIn(true);
    setUsername(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUsername(null);
  }, []);

  const routes = (
    <Switch>
      <Route path={PAGE_URL.LOGIN} exact>
        <LoginPage />
      </Route>
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        username: username,
        login: login,
        logout: logout,
      }}
    >
      {isLoggedIn ? <main>{routes}</main> : <LoginPage />}
    </AuthContext.Provider>
  );
}

export default App;
