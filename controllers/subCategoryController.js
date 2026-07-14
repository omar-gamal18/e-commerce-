const SubCategory = require("../models/subCategoryModel");
const Factory = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category && req.params.categoryId) {
    req.body.category = req.params.categoryId;
  }
  next();
};

exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };

  req.filterObject = filterObj;

  next();
};

exports.getAllSubCategories = Factory.getAll(SubCategory);
exports.getSubCategory = Factory.getOne(SubCategory);
exports.createSubCategory = Factory.createOne(SubCategory);
exports.updateSubCategory = Factory.updateOne(SubCategory);
exports.deleteSubCategory = Factory.deleteOne(SubCategory);
