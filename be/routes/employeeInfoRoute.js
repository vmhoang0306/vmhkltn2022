import express from "express";
import { findByKeySearch, getAllEmployeeInfo, getInfoById } from "../controllers/employeeController.js";

const employeeInfoRouter = express.Router();
employeeInfoRouter.get("/findbykeysearch", findByKeySearch);
employeeInfoRouter.get("/getbyid", getInfoById);
employeeInfoRouter.get("/getall", getAllEmployeeInfo);

export default employeeInfoRouter;
