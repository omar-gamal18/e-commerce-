const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

const Product = require("../models/productModel");

exports.getProducts = async (req, res) => {
  const documentCounts = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search("Products")
    .sort()
    .limitFields();

  const { mongooseQuery, paginationResult } = apiFeatures;

  const products = await mongooseQuery;

  res
    .status(200)
    .json({ results: products.length, paginationResult, data: { products } });
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
