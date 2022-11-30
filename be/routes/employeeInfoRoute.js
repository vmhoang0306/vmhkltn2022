import express from "express";
import { getAllEmployeeInfo, getInfoById } from "../controllers/employeeController.js";

const employeeInfoRouter = express.Router();
employeeInfoRouter.get("/getbyid", getInfoById);
employeeInfoRouter.get("/getall", getAllEmployeeInfo);

export default employeeInfoRouter;
