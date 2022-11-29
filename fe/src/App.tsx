import { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
  withRouter
} from "react-router-dom";
import { BreadcrumbUI } from "./components/general";
import HeaderComponent from "./components/layout/Header";
import { PAGE_URL } from "./constant/route";
import PageNotFound from "./features/common/PageNotFound";
import EmployeeInfoPage from "./features/EmployeeInfo/EmployeeInfo/pages/EmployeeInfoPage";
import EmployeeInfoFindPage from "./features/EmployeeInfo/EmployeeInfoFind/pages/EmployeeInfoFindPage";
import { AuthContext } from "./features/Login/Context/AuthContext";
import LoginPage from "./features/Login/LoginPage";

function App() {
  const history = useHistory();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (!checkCookie()) {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  const setCookie = (uid: string, isLogin: boolean) => {
    var d = new Date();
    d.setTime(d.getTime() + 30 * 60 * 1000);
    var expires =
      "expires=" +
      (isLogin ? d.toUTCString() : "Thu, 01 Jan 1970 00:00:00 UTC");
    document.cookie = "username=" + uid + "; " + expires;
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

  const login = useCallback((uid: string) => {
    setUsername(uid);
    setCookie(uid, true);
    history.push(PAGE_URL.EMPLOYEEINFO.INFO);
    window.location.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    setUsername("");
    setCookie("", false);
    history.push("/login");
    window.location.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes = checkCookie() ? (
    <Switch>
      <Route
        exact
        path={PAGE_URL.EMPLOYEEINFO.FIND}
        component={withRouter(EmployeeInfoFindPage)}
      />
      <Route
        exact
        path={PAGE_URL.EMPLOYEEINFO.INFO}
        component={withRouter(EmployeeInfoPage)}
      />

      <Redirect exact from="/" to={PAGE_URL.EMPLOYEEINFO.INFO} />

      <Route component={withRouter(PageNotFound)} />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/login" component={withRouter(LoginPage)} />
      <Route component={withRouter(PageNotFound)} />

      <Redirect exact to="/login" />
    </Switch>
  );

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          username: username,
          login: login,
          logout: logout,
        }}
      >
        {checkCookie() ? (
          <div>
            <HeaderComponent />
            <div className="px-5 pt-2 pb-5">
              <BreadcrumbUI />
              {routes}
            </div>
          </div>
        ) : (
          <LoginPage />
        )}
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
