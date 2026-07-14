const Category = require("../models/categoryModel");
const Factory = require("./handlersFactory");

exports.getAllCategories = Factory.getAll(Category);
exports.getCategory = Factory.getOne(Category);
exports.createCategory = Factory.createOne(Category);
exports.updateCategory = Factory.updateOne(Category);
exports.deleteCategory = Factory.deleteOne(Category);
