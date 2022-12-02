import express from "express";
import { getAllDepartment } from "../controllers/departmentController.js";

const departmentRouter = express.Router();
departmentRouter.get("/", getAllDepartment);

export default departmentRouter;
