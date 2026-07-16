const jwt = require("jsonwebtoken");

//const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

exports.signUp = async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
