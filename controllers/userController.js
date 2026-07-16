const sharp = require("sharp");

const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const Factory = require("./handlersFactory");
const User = require("../models/userModel");

exports.uploadUserImage = uploadSingleImage("image");

exports.resizeImage = async (req, res, next) => {
  const fileName = `user-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/users/${fileName}`);

  req.body.profileImg = fileName;
  next();
};

exports.getAllUsers = Factory.getAll(User);
exports.getUser = Factory.getOne(User);
exports.createUser = Factory.createOne(User);
exports.updateUser = Factory.updateOne(User);
exports.deleteUser = Factory.deleteOne(User);
