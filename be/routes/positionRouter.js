import express from "express";
import { getAllPosition } from "../controllers/positionController.js";

const positionRouter = express.Router();
positionRouter.get("/", getAllPosition);

export default positionRouter;
