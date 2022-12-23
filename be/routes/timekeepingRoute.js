import express from "express";
import {
  checkTimekeeping,
  createTimekeeping,
  getListForManager,
  getListTimekeeping,
  updateHourTimekeeping,
} from "../controllers/timekeepingController.js";

const timekeepingRouter = express.Router();
timekeepingRouter.get("/getlist", getListTimekeeping);
timekeepingRouter.get("/getlistformanager", getListForManager);
timekeepingRouter.post("/create", createTimekeeping);
timekeepingRouter.post("/check", checkTimekeeping);
timekeepingRouter.post("/updatehour", updateHourTimekeeping);

export default timekeepingRouter;
