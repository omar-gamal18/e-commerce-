const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const globalError = require("./middlewares/errorMiddleware");
const categoryRouter = require("./routes/categoryRoutes");
const apiError = require("./utils/apiError");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

app.use("/api/v1/categories", categoryRouter);

app.all("/*handle404", (req, res, next) => {
  next(new apiError("cann't find this route", 404));
});

app.use(globalError);

module.exports = app;
