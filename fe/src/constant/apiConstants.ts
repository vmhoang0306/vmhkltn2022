export const ApiConstants = {
  login: "/api/auth/login",
  changepass: "/api/auth/changepass",

  department: "/api/department",
  store: "/api/store",
  shift: "/api/shift",
  position: "/api/position",

  employeeinfo: {
    getall: "/api/employeeinfo/getall",
    getbyid: "/api/employeeinfo/getbyid",
    findbykeysearch: "/api/employeeinfo/findbykeysearch",
    search: "/api/employeeinfo/searchlist",
    create: "/api/employeeinfo/create",
    update: "/api/employeeinfo/update",
    delete: "/api/employeeinfo/delete",
    restore: "/api/employeeinfo/restore",
  },

  transfer: {
    report: {
      getlist: "/api/transfer/getlist",
      create: "/api/transfer/create",
      delete: "/api/transfer/delete",
    },
  },

  timekeeping: {
    getlist: "/api/timekeeping/getlist",
    getlistformanager: "/api/timekeeping/getlistformanager",
    create: "/api/timekeeping/create",
    check: "/api/timekeeping/check",
    updatehour: "/api/timekeeping/updatehour",
  },

  vacation: {
    getlist: "api/vacation/getlist",
    getapproveduser: "/api/vacation/getapproveduser",
    create: "/api/vacation/create",
    approve: "/api/vacation/approve",
    delete: "/api/vacation/delete",
  },
};
