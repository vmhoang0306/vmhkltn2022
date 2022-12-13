import express from "express";
import {
  getList,
  createTransfer,
  deleteTransfer,
} from "../controllers/transferController.js";

const transferRouter = express.Router();
transferRouter.post("/delete", deleteTransfer);
transferRouter.post("/create", createTransfer);
transferRouter.get("/getlist", getList);

export default transferRouter;
