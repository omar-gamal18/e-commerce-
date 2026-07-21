const sharp = require("sharp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ApiError = require("../utils/apiError");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const Factory = require("./handlersFactory");
const User = require("../models/userModel");

const signToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

exports.uploadUserImage = uploadSingleImage("profileImg");

exports.resizeImage = async (req, res, next) => {
  const fileName = `user-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${fileName}`);

    req.body.profileImg = fileName;
  }
  next();
};

exports.getAllUsers = Factory.getAll(User);
exports.getUser = Factory.getOne(User);
exports.createUser = Factory.createOne(User);
exports.deleteUser = Factory.deleteOne(User);

exports.updateUser = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    {
      new: true,
      runValidator: true,
    },
  );

  if (!user) {
    return next(new ApiError(`No user for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: user });
};

exports.changeUserPassword = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
      runValidator: true,
    },
  );

  if (!user) {
    return next(new ApiError(`No user for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: user });
};

exports.getLoggedUserData = async (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.updateLoggedUserPassword = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
      runValidator: true,
    },
  );

  const token = signToken(user._id);
  res.status(200).json({ data: user, token });
};

exports.updateLoggedUserData = async (req, res, next) => {
  const loggedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    },
    {
      new: true,
      runValidator: true,
    },
  );
  res.status(200).json({ data: loggedUser });
};

exports.deleteLoggedUserData = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ data: null });
};
