// import { PAGE_URL } from "constant";
// import { BreadcrumbI } from "models/layout/layout";

// export const UtilsRoute = {
//   getBreadcrumbByRoute: (route: string) => {
//     let breadcrumbs: BreadcrumbI = [
//       {
//         path: PAGE_URL.HOMEPAGE,
//         breadcrumbName: "Trang chủ",
//       },
//     ];
//     switch (route) {
//       case PAGE_URL.HOMEPAGE:
//         break;
//       case PAGE_URL.NOT_PERMISSION:
//         breadcrumbs = [];
//         break;
//       default:
//         breadcrumbs = [];
//         break;
//     }
//     return breadcrumbs;
//   },
//   getTitleBrowserByPathName: (pathName: string) => {
//     let titleBrowser = "";
//     if (pathName === PAGE_URL.HOMEPAGE) {
//       titleBrowser = "Trang chủ";
//     }
//     if (pathName === PAGE_URL.NOT_PERMISSION) {
//       titleBrowser = "Not Permission";
//     }

//     titleBrowser =
//       titleBrowser.length > 0
//         ? `${titleBrowser} | Office`
//         : "Page Not Found | Office";
//     return titleBrowser;
//   },
// };
