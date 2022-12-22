import express from "express";
import {
  approvedVacation,
  createVacationRequirement,
  getApprovedUser,
} from "../controllers/vacationController.js";

const vacationRouter = express.Router();
vacationRouter.get("/getapproveduser", getApprovedUser);
vacationRouter.post("/create", createVacationRequirement);
vacationRouter.post("/approve", approvedVacation);

export default vacationRouter;
