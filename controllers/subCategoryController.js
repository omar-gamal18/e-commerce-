const slugify = require("slugify");

const SubCategory = require("../models/subCategoryModel");
const ApiError = require("../utils/apiError");

exports.getAllSubCategories = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  const subCategories = await SubCategory.find().skip(skip).limit(limit);

  res.status(200).json({
    status: "success",
    results: subCategories.length,
    data: { subCategories },
  });
};

exports.getSubCategory = async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id);

  if (!subCategory) {
    return next(new ApiError("No subCategory With This Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: { subCategory },
  });
};

exports.createSubCategory = async (req, res, next) => {
  const { name, category } = req.body;

  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });

  res.status(201).json({
    status: "success",
    data: { subCategory },
  });
};
