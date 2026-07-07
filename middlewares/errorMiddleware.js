const ApiError = require("../utils/apiError");

const globalError = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;
  error.status = err.status || "error";

  // Mongoose invalid ObjectId formatting error
  if (err.name === "CastError") {
    error.message = `Invalid ${err.path}: ${err.value}`;
    error.statusCode = 400;
    error.status = "fail";
  }

  return res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: err.stack,
  });
};

module.exports = globalError;
