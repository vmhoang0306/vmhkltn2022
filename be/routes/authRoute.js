import express from "express";
import { changepass, login } from "../controllers/authController.js";

const authRouter = express.Router();
authRouter.post("/changepass", changepass)
authRouter.post("/login", login)

export default authRouter;