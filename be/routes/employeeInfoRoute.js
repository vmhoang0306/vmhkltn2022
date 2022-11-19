import express from "express";
import { getAllEmployeeInfo, getInfoById } from "../controllers/employeeController.js";

const employeeInfoRouter = express.Router();
employeeInfoRouter.get("/", getAllEmployeeInfo);
employeeInfoRouter.get("/:username", getInfoById);

export default employeeInfoRouter;
