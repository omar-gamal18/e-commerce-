const slugify = require("slugify");

const Category = require("../models/categoryModel");
const ApiError = require("../utils/apiError");

exports.getAllCategories = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  const categories = await Category.find().skip(skip).limit(limit);

  res.status(200).json({
    status: "success",
    results: categories.length,
    data: { categories },
  });
};

exports.getCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ApiError("No Category With This Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: { category },
  });
};

exports.createCategory = async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.create({
    name,
    slug: slugify(name),
  });

  res.status(201).json({
    status: "success",
    data: { category },
  });
};

exports.updateCategory = async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, slug: slugify(name) },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!category) {
    return next(new ApiError("No Category With This Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: { category },
  });
};

exports.deleteCategory = async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new ApiError("No Category With This Id", 404));
  }

  res.status(204).send();
};
