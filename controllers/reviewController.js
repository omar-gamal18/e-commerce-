const Factory = require("./handlersFactory");
const Review = require("../models/reviewModel");

exports.setproductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product && req.params.productId) {
    req.body.product = req.params.productId;
  }
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  next();
};

exports.getReviews = Factory.getAll(Review);
exports.getReview = Factory.getOne(Review);

exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.productId) filterObj = { product: req.params.productId };

  req.filterObj = filterObj;

  next();
};

exports.createReview = Factory.createOne(Review);
exports.updateReview = Factory.updateOne(Review);
exports.deleteReview = Factory.deleteOne(Review);
