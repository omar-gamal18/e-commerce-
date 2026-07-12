const slugify = require("slugify");

const SubCategory = require("../models/subCategoryModel");
const ApiError = require("../utils/apiError");

exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };

  req.filterObject = filterObj;

  next();
};

exports.getAllSubCategories = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  const subCategories = await SubCategory.find(req.filterObject)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });

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

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.categoryId) req.body.category = req.params.categoryId;
  next();
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

exports.updateSubCategory = async (req, res, next) => {
  const { name, category } = req.body;

  const subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    { name, slug: slugify(name), category },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!subCategory) {
    return next(new ApiError("No subCategory With This Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: { subCategory },
  });
};

exports.deleteSubCategory = async (req, res, next) => {
  const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

  if (!subCategory) {
    return next(new ApiError("No subCategory With This Id", 404));
  }

  res.status(204).send();
};
