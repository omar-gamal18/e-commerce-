const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const globalError = require("./middlewares/errorMiddleware");
const ApiError = require("./utils/apiError");
const categoryRouter = require("./routes/categoryRoutes");
const subCategoryRouter = require("./routes/subCategoryRoutes");
const brandRoute = require("./routes/brandRoutes");
const productRoute = require("./routes/productRoutes");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);

app.all("/*handle404", (req, res, next) => {
  next(new ApiError("cann't find this route", 404));
});

app.use(globalError);

module.exports = app;
