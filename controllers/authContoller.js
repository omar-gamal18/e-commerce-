const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

const signToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

exports.signUp = async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("invalid email or password", 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
