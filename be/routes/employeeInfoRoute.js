import express from "express";
import { getAllEmployeeInfo } from "../controllers/employeeController.js";

const employeeInfoRouter = express.Router();
employeeInfoRouter.get("/", getAllEmployeeInfo);

export default employeeInfoRouter;
