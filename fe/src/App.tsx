import { Layout, Space } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
  withRouter,
} from "react-router-dom";
import { BreadcrumbUI, TextUI, TitleUI } from "./components/general";
import { AlertUI } from "./components/general/AlertUI";
import { FooterComponent } from "./components/layout/Footer";
import HeaderComponent from "./components/layout/Header";
import { ApiConstants, PAGE_URL } from "./constant";
import ChangePassPage from "./features/ChangePassword/pages/ChangePassPage";
import PageNotFound from "./features/common/PageNotFound";
import EmployeeInfoPage from "./features/EmployeeInfo/pages/EmployeeInfoPage";
import EmployeeInfoFindPage from "./features/EmployeeInfoFind/pages/EmployeeInfoFindPage";
import EmployeeManagePage from "./features/EmployeeInfoManage/Pages/EmployeeManagePage";
import { AuthContext } from "./features/Login/Context/AuthContext";
import LoginPage from "./features/Login/LoginPage";
import TimekeepingPage from "./features/Timekeeping/Pages/TimekeepingPage";
import TimekeepingManagePage from "./features/TimekeepingManage/Pages/TimekeepingManagePage";
import TransferPage from "./features/Transfer/Pages/TransferPage";
import TransferApprovalPage from "./features/TransferApproval/Pages/TransferApprovalPage";
import VacationApprovalPage from "./features/VacationApproval/Pages/TransferApprovalPage";
import { Utils } from "./utils";

function App() {
  const history = useHistory();
  const [isTimekeeping, setIsTimekeeping] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (checkCookie()) {
      getIsManager();
      getIsTimekeeping();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!checkCookie()) {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  const setCookie = (uid: string, isLogin: boolean) => {
    var d = new Date();
    d.setTime(d.getTime() + 60 * 60 * 1000);
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

  const getIsTimekeeping = async () => {
    const url = ApiConstants.timekeeping.create;
    const res: any = await axios.post(url, {
      username: getCookie(),
    });

    if (res.data.status === "success") {
      setIsTimekeeping(res.data.data[0].ischeck);
    }
  };

  const getIsManager = async () => {
    const url = ApiConstants.employeeinfo.getbyid;
    const params = { username: getCookie() };
    const res: any = await axios.get(url, { params });
    const pos = res.data.data.position._id;
    if (
      pos !== "6388c9a5e04edff798f8f40e" &&
      pos !== "6388c980e04edff798f8f40d" &&
      pos !== "6388c961e04edff798f8f40c"
    ) {
      setIsManager(true);
    }
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
    getIsManager();
    getIsTimekeeping();
    setDone(true);
    history.push(PAGE_URL.EMPLOYEEINFO.INFO);
    // window.location.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    setCookie("", false);
    history.push("/login");
    window.location.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkTimekeeping = useCallback((uid: string, hour: any, date: any) => {
    const check = async () => {
      const url = ApiConstants.timekeeping.check;
      const data = {
        username: uid,
        hour: hour,
        date: new Date(Utils.date.formatDateInput(date)!),
      };

      const res: any = await axios.post(url, data);

      if (res.data.status === "success") {
        setIsTimekeeping(true);
      }
    };

    check();
  }, []);

  const routes = checkCookie() ? (
    <Switch>
      <Route
        exact
        path={PAGE_URL.CHANGEPASS}
        component={withRouter(ChangePassPage)}
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
        component={withRouter(TransferApprovalPage)}
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
          ismanager: isManager,
          isTimekeeping: isTimekeeping,
          checkTimekeeping: checkTimekeeping,
          login: login,
          logout: logout,
        }}
      >
        {checkCookie() ? (
          <Layout className="min-height-100vh bg-white">
            <HeaderComponent />

            {!isTimekeeping && (
              <AlertUI
                banner
                type="error"
                description={
                  <Space className="d-flex justify-content-space-between">
                    <TitleUI
                      className="txt-danger"
                      text="Bạn chưa chấm công hôm nay!"
                    />

                    <TextUI
                      className="hv-textui-link txt-primary"
                      text="Đến trang chấm công"
                      onClick={() => {
                        history.push(PAGE_URL.TIMEKEEPING.TIMEKEEPING);
                        window.location.reload();
                      }}
                    />
                  </Space>
                }
              />
            )}
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
