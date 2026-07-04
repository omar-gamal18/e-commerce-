const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

module.exports = app;
