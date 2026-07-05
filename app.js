const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const categoryRouter = require("./routes/categoryRoutes");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

app.use("/api/v1/categories", categoryRouter);

module.exports = app;
