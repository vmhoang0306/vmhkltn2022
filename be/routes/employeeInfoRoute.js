import express from "express";
import {
  createEmployeeInfo,
  deleteEmployeeInfo,
  findByKeySearch,
  getAllEmployeeInfo,
  getInfoById,
  restoreEmployeeInfo,
  searchList,
  updateEmployeeInfo,
} from "../controllers/employeeController.js";

const employeeInfoRouter = express.Router();
employeeInfoRouter.post("/update", updateEmployeeInfo);
employeeInfoRouter.post("/restore", restoreEmployeeInfo);
employeeInfoRouter.post("/create", createEmployeeInfo);
employeeInfoRouter.post("/delete", deleteEmployeeInfo);
employeeInfoRouter.get("/findbykeysearch", findByKeySearch);
employeeInfoRouter.get("/searchlist", searchList);
employeeInfoRouter.get("/getbyid", getInfoById);
employeeInfoRouter.get("/getall", getAllEmployeeInfo);

export default employeeInfoRouter;
