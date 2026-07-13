const slugify = require("slugify");
const ApiError = require("../utils/apiError");

const Product = require("../models/productModel");

exports.getProducts = async (req, res) => {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const queryStrObj = { ...req.query };
  const excludesFields = ["sort", "limit", "page", "fields"];
  excludesFields.forEach((field) => delete queryStrObj[field]);

  // Apply filtration using [gte, gt, lte, lt]
  let queryStr = JSON.stringify(queryStrObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 20;
  const skip = (page - 1) * limit;

  const mongooseQuery = Product.find(JSON.parse(queryStr))
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });

  const products = await mongooseQuery;

  res.status(200).json({ results: products.length, page, data: products });
};

exports.getProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
};

exports.createProduct = async (req, res) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(204).send();
};
