import express from "express";
import { getAllShiftType } from "../controllers/shiftController.js";

const shiftRouter = express.Router();
shiftRouter.get("/", getAllShiftType);

export default shiftRouter;
