import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import employeeInfoRouter from "./routes/employeeInfoRoute.js";
import shiftRouter from "./routes/shiftRouter.js";
import authRouter from "./routes/authRoute.js";
import departmentRouter from "./routes/departmentRouter.js";
import positionRouter from "./routes/positionRouter.js";
import storeRouter from "./routes/storeRouter.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept, Authorization "
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

app.use("/api/employeeinfo", employeeInfoRouter);
app.use("/api/store", storeRouter)
app.use("/api/department", departmentRouter)
app.use("/api/shift", shiftRouter)
app.use("/api/position", positionRouter)
app.use("/api/auth", authRouter)

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_STRING_CLOUD, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(`${err} did not connect`));
mongoose.set("useFindAndModify", false);
