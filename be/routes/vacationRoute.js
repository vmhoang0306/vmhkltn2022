import express from "express";
import {
  approvedVacation,
  createVacationRequirement,
  deleteVacation,
  getApprovedUser,
  getListForManager,
  getVacationRequirement,
} from "../controllers/vacationController.js";

const vacationRouter = express.Router();
vacationRouter.get("/getlist", getVacationRequirement);
vacationRouter.get("/getlistformanager", getListForManager);
vacationRouter.get("/getapproveduser", getApprovedUser);
vacationRouter.post("/create", createVacationRequirement);
vacationRouter.post("/delete", deleteVacation);
vacationRouter.post("/approve", approvedVacation);

export default vacationRouter;
