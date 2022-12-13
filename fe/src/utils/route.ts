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
        breadcrumbs.push({ path: "", breadcrumbName: "Thông tin nhân viên" });
        break;
      case PAGE_URL.EMPLOYEEINFO.MANAGE:
        breadcrumbs.push({ path: "", breadcrumbName: "Danh sách nhân viên" });
        break;
      case PAGE_URL.EMPLOYEEINFO.FIND:
        breadcrumbs.push({ path: "", breadcrumbName: "Tìm kiếm nhân viên" });
        break;
      case PAGE_URL.TIMEKEEPING.TIMEKEEPING:
        breadcrumbs.push({ path: "", breadcrumbName: "Chấm công" });
        break;
      case PAGE_URL.TRANSFER.TRANSFER:
        breadcrumbs.push({ path: "", breadcrumbName: "Thuyên chuyển" });
        break;
      case PAGE_URL.CHANGEPASS:
        breadcrumbs.push({ path: "", breadcrumbName: "Thay đổi mật khẩu" });
        break;
    }

    return breadcrumbs;
  },
};
