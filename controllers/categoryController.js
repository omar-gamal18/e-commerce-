const multer = require("multer");
const path = require("path");

const ApiError = require("../utils/apiError");
const Category = require("../models/categoryModel");
const Factory = require("./handlersFactory");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads", "categories"));
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `category-${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Only images are allowed", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter });

exports.uploadCategoryImage = upload.single("image");

exports.getAllCategories = Factory.getAll(Category);
exports.getCategory = Factory.getOne(Category);
exports.createCategory = Factory.createOne(Category);
exports.updateCategory = Factory.updateOne(Category);
exports.deleteCategory = Factory.deleteOne(Category);
