const path = require("path");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

require("dotenv").config();
const globalError = require("./middlewares/errorMiddleware");
const ApiError = require("./utils/apiError");
const mountRoutes = require("./routes");
const { webhookCheckout } = require("./controllers/orderController");

const app = express();

app.use(cors());
app.options(/.*/, cors());

app.use(compression());

app.post("/webhook-checkout", express.raw({ type: "*/*" }), webhookCheckout);

app.set("query parser", "extended");
app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);
app.use(
  hpp({
    whitelist: [
      "price",
      "ratingsAverage",
      "ratingsQuantity",
      "sold",
      "quantity",
    ],
  }),
);

mountRoutes(app);

app.all(/.*/, (req, res, next) => {
  next(new ApiError("cann't find this route", 404));
});

app.use(globalError);

module.exports = app;
