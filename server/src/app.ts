import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import rootRouter from "./routes";

import db from "./config/database";

// db
db.authenticate()
  .then(() => console.log("database successfully conneted"))
  .catch((err) => {
    console.log("data base not connected");
    console.error(err);
  });

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(logger("combined"));
  app.use("/", rootRouter);
} else {
  app.use(logger("dev"));
  app.use("/api", rootRouter);
}

export default app;
