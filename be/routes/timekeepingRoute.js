import express from "express";
import {
  checkTimekeeping,
  createTimekeeping,
  getListTimekeeping,
} from "../controllers/timekeepingController.js";

const timekeepingRouter = express.Router();
timekeepingRouter.get("/getlisttimekeeping", getListTimekeeping);
timekeepingRouter.post("/create", createTimekeeping);
timekeepingRouter.post("/check", checkTimekeeping);

export default timekeepingRouter;
