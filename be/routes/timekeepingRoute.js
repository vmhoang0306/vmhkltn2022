import express from "express";
import {
  checkTimekeeping,
  createTimekeeping,
} from "../controllers/timekeepingController.js";

const timekeepingRouter = express.Router();
timekeepingRouter.post("/create", createTimekeeping);
timekeepingRouter.post("/check", checkTimekeeping);

export default timekeepingRouter;
