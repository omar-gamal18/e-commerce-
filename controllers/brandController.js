const sharp = require("sharp");

const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const Factory = require("./handlersFactory");
const Brand = require("../models/brandModel");

exports.uploadBrandImage = uploadSingleImage("image");

exports.resizeImage = async (req, res, next) => {
  const fileName = `category-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${fileName}`);

  req.body.image = fileName;
  next();
};

exports.getBrands = Factory.getAll(Brand);
exports.getBrand = Factory.getOne(Brand);
exports.createBrand = Factory.createOne(Brand);
exports.updateBrand = Factory.updateOne(Brand);
exports.deleteBrand = Factory.deleteOne(Brand);
