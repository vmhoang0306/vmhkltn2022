import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { BreadcrumbUI } from "./components/general";
import HeaderComponent from "./components/layout/Header";
import { PAGE_URL } from "./constant/route";
import EmployeeInfoPage from "./features/EmployeeInfo/EmployeeInfo/pages/EmployeeInfoPage";
import EmployeeInfoFindPage from "./features/EmployeeInfo/EmployeeInfoFind/pages/EmployeeInfoFindPage";
import { AuthContext } from "./features/Login/Context/AuthContext";
import LoginPage from "./features/Login/LoginPage";

function App() {
  const [username, setUsername] = useState();

  useEffect(() => {
    document.title = "MWG | HRM";
    window.scrollTo(0, 0);
  }, []);

  const setCookie = (uid, isLogin) => {
    var d = new Date();
    d.setTime(d.getTime() + 30 * 60 * 1000);
    var expires =
      "expires=" +
      (isLogin ? d.toUTCString() : "Thu, 01 Jan 1970 00:00:00 UTC");
    document.cookie =
      "username=" +
      (uid === null || uid === undefined ? "" : uid) +
      "; " +
      expires;
  };

  const getCookie = () => {
    var username = "";
    const cookie = document.cookie;
    const arrCk = cookie.split(";");
    arrCk.forEach((item) => {
      var i = item;

      if (i.charAt(0) === " ") {
        i = item.substring(1);
      }

      if (i.indexOf("username=") === 0) {
        username = i.substring("username=".length, i.length);
      }
    });

    return username;
  };

  const checkCookie = () => {
    if (getCookie().length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const login = useCallback((uid) => {
    setUsername(uid);
    setCookie(uid, true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    setUsername(null);
    setCookie(null, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes = (
    <Switch>

      <Route patch={PAGE_URL.EMPLOYEEINFO.FIND} exact>
        <EmployeeInfoFindPage />
      </Route>

      <Route patch={PAGE_URL.EMPLOYEEINFO.INFO} exact>
        <EmployeeInfoPage />
      </Route>
      
      <Redirect from="/" to={PAGE_URL.EMPLOYEEINFO.INFO} exact />
    </Switch>
  );

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          userinfo: username,
          login: login,
          logout: logout,
        }}
      >
        {checkCookie() ? (
          <div>
            <HeaderComponent />
            <BreadcrumbUI />
            <div className="px-5 py-2">{routes}</div>
          </div>
        ) : (
          <LoginPage />
        )}
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
