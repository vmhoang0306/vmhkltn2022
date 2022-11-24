import { PAGE_URL } from "../constant/route";
import { IBreadcrumb } from "../models/breadcrumb";

export const UtilsRoute = {
  getBreadcrumbByRoute: (route: string) => {
    let breadcrumbs: IBreadcrumb = [
      {
        path: "/",
        breadcrumbName: "HRM",
      },
    ];

    switch (route) {
      case PAGE_URL.EMPLOYEEINFO.INFO:
        breadcrumbs.push({path: '', breadcrumbName: 'Thông tin nhân viên'});
        break;
      case PAGE_URL.EMPLOYEEINFO.MANAGE:
        breadcrumbs.push({path: '', breadcrumbName: 'Danh sách nhân viên'});
        break;
    }

    return breadcrumbs;
  },

  getTitleBrowserByPathName: (pathName: string) => {
    let titleBrowser = '';
    if (pathName === "/") {
      titleBrowser = "MWG | HRM";
    }
    if (pathName === PAGE_URL.EMPLOYEEINFO.INFO) {
      titleBrowser = "HRM | Thông tin nhân viên";
    }
    if (pathName === PAGE_URL.EMPLOYEEINFO.MANAGE) {
      titleBrowser = "HRM | Danh sách nhân viên";
    }

    return titleBrowser;
  },
};
