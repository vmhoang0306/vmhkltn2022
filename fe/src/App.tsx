import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { useCallback, useEffect } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
  withRouter,
} from "react-router-dom";
import { BreadcrumbUI } from "./components/general";
import { FooterComponent } from "./components/layout/Footer";
import HeaderComponent from "./components/layout/Header";
import { PAGE_URL } from "./constant";
import PageNotFound from "./features/common/PageNotFound";
import EmployeeInfoPage from "./features/EmployeeInfo/pages/EmployeeInfoPage";
import EmployeeInfoFindPage from "./features/EmployeeInfoFind/pages/EmployeeInfoFindPage";
import EmployeeManagePage from "./features/EmployeeInfoManage/Pages/EmployeeManagePage";
import { AuthContext } from "./features/Login/Context/AuthContext";
import LoginPage from "./features/Login/LoginPage";
import TimekeepingPage from "./features/Timekeeping/Pages/TimekeepingPage";
import TimekeepingManagePage from "./features/TimekeepingManage/Pages/TimekeepingManagePage";
import TransferPage from "./features/Transfer/Pages/TransferPage";
import TransferApprovalManage from "./features/TransferApproval/Components/TransferApprovalManage";
import VacationPage from "./features/Vacation/Pages/VacationPage";
import VacationApprovalPage from "./features/VacationApproval/Pages/TransferApprovalPage";

function App() {
  const history = useHistory();

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
    setCookie(uid, true);
    history.push(PAGE_URL.EMPLOYEEINFO.INFO);
    window.location.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    setCookie("", false);
    history.push("/login");
    window.location.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes = checkCookie() ? (
    <Switch>
      <Route
        exact
        path={PAGE_URL.VACATION.VACATION}
        component={withRouter(VacationPage)}
      />
      <Route
        exact
        path={PAGE_URL.VACATION.MANAGE}
        component={withRouter(VacationApprovalPage)}
      />

      <Route
        exact
        path={PAGE_URL.TRANSFER.TRANSFER}
        component={withRouter(TransferPage)}
      />
      <Route
        exact
        path={PAGE_URL.TRANSFER.MANAGE}
        component={withRouter(TransferApprovalManage)}
      />

      <Route
        exact
        path={PAGE_URL.TIMEKEEPING.TIMEKEEPING}
        component={withRouter(TimekeepingPage)}
      />
      <Route
        exact
        path={PAGE_URL.TIMEKEEPING.MANAGE}
        component={withRouter(TimekeepingManagePage)}
      />

      <Route
        exact
        path={PAGE_URL.EMPLOYEEINFO.MANAGE}
        component={withRouter(EmployeeManagePage)}
      />
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
          username: getCookie(),
          login: login,
          logout: logout,
        }}
      >
        {checkCookie() ? (
          <Layout className="min-height-100vh bg-white">
            <HeaderComponent />

            <Content className="px-5 pt-2 pb-5 m-0">
              <BreadcrumbUI />
              {routes}
            </Content>

            <Footer className="p-0">
              <FooterComponent />
            </Footer>
          </Layout>
        ) : (
          <LoginPage />
        )}
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
