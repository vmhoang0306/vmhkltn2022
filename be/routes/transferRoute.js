import express from "express";
import {
  getList,
  createTransfer,
  deleteTransfer,
  getListForManager,
  approveTransfer,
} from "../controllers/transferController.js";

const transferRouter = express.Router();
transferRouter.post("/approve", approveTransfer);
transferRouter.post("/delete", deleteTransfer);
transferRouter.post("/create", createTransfer);
transferRouter.get("/getlist", getList);
transferRouter.get("/getlistformanager", getListForManager);

export default transferRouter;
