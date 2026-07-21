const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ApiError = require("../utils/apiError");
const sendEmail = require("../utils/email");
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

exports.protect = async (req, res, next) => {
  // 1) Check if token exist, if exist get
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ApiError(
        "You are not login, Please login to get access this route",
        401,
      ),
    );
  }

  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 3) Check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "The user that belong to this token does no longer exist",
        401,
      ),
    );
  }

  // 4) Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10,
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed his password. please login again..",
          401,
        ),
      );
    }
  }

  req.user = currentUser;
  next();
};

exports.allowedTo =
  (...roles) =>
  async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("you are not allowed to access this route", 403),
      );
    }

    next();
  };

exports.forgetPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("There is no user with this email", 404));
  }

  const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(randomCode)
    .digest("hex");

  user.passwordResetCode = hashedResetCode;
  user.passwordResetCodeExpires = Date.now() + 3 * 60 * 1000;
  user.passwordResetVerefied = false;

  await user.save;

  await sendEmail({
    email: user.email,
    subject: "reset your password",
    message: `your password reset key is:${randomCode}`,
  });

  res.status(200).json({ status: "success" });
};
