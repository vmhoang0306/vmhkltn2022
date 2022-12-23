import express from "express";
import {
  approvedVacation,
  createVacationRequirement,
  deleteVacation,
  getApprovedUser,
  getVacationRequirement,
} from "../controllers/vacationController.js";

const vacationRouter = express.Router();
vacationRouter.get("/getlist", getVacationRequirement);
vacationRouter.get("/getapproveduser", getApprovedUser);
vacationRouter.post("/create", createVacationRequirement);
vacationRouter.post("/delete", deleteVacation);
vacationRouter.post("/approve", approvedVacation);

export default vacationRouter;
