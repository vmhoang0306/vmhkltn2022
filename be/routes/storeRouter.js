import express from "express";
import { getAllStore } from "../controllers/storeController.js";

const storeRouter = express.Router();
storeRouter.get("/", getAllStore);

export default storeRouter;
