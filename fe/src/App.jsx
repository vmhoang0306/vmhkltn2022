import { useCallback, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HeaderComponent from "./components/layout/Header";
import { PAGE_URL } from "./constant/route";
import EmployeeInfoPage from "./features/EmployeeInfo/EmployeeInfo/pages/EmployeeInfoPage";
import { AuthContext } from "./features/Login/Context/AuthContext";
import LoginPage from "./features/Login/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState();

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUsername(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUsername(null);
  }, []);

  const routes = (
    <Switch>
      <Route patch={PAGE_URL.HOME}>Đây là trang Home</Route>
      <Route patch={PAGE_URL.EMPLOYEEINFO} exact>
        <EmployeeInfoPage />
      </Route>
    </Switch>
  );

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userinfo: username,
          login: login,
          logout: logout,
        }}
      >
        {isLoggedIn ? (
          <>
            <HeaderComponent />
            {routes}
          </>
        ) : (
          <LoginPage />
        )}
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
