const Product = require("../models/productModel");
const Factory = require("./handlersFactory");

exports.getProducts = Factory.getAll(Product, "Products");
exports.getProduct = Factory.getOne(Product);
exports.createProduct = Factory.createOne(Product);
exports.updateProduct = Factory.updateOne(Product);
exports.deleteProduct = Factory.deleteOne(Product);
