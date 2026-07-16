const sharp = require("sharp");
const bcrypt = require("bcryptjs");

const ApiError = require("../utils/apiError");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const Factory = require("./handlersFactory");
const User = require("../models/userModel");

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
  const document = await User.findByIdAndUpdate(
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

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
};
