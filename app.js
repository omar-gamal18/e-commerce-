const path = require("path");

const express = require("express");
const morgan = require("morgan");

require("dotenv").config();
const globalError = require("./middlewares/errorMiddleware");
const ApiError = require("./utils/apiError");
const mountRoutes = require("./routes");

const app = express();
app.set("query parser", "extended");
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

mountRoutes(app);

app.all("/*handle404", (req, res, next) => {
  next(new ApiError("cann't find this route", 404));
});

app.use(globalError);

module.exports = app;
