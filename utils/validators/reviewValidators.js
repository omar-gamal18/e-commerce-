const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Review = require("../../models/reviewModel");

exports.createReviewValidator = [
  check("ratings")
    .notEmpty()
    .withMessage("Ratings value is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Ratings value must be between 1.0 and 5.0"),
  check("user")
    .notEmpty()
    .withMessage("User is required")
    .isMongoId()
    .withMessage("Invalid User id format"),
  check("product")
    .notEmpty()
    .withMessage("Product is required")
    .isMongoId()
    .withMessage("Invalid Product id format")
    .custom(async (val, { req }) => {
      const review = await Review.findOne({
        user: req.body.user,
        product: req.body.product,
      });
      if (review) {
        throw new Error("You have already reviewed this product");
      }
    }),

  validatorMiddleware,
];

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review id format"),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom(async (val, { req }) => {
      const review = await Review.findById(val);
      if (!review) {
        throw new Error("Review not found");
      }
      if (review.user._id.toString() !== req.user._id.toString()) {
        throw new Error("You are not allowed to update this review");
      }
    }),
  check("ratings")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Ratings value must be between 1.0 and 5.0"),
  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom(async (val, { req }) => {
      if (req.user.role === "user") {
        const review = await Review.findById(val);
        if (!review) {
          throw new Error("Review not found");
        }
        if (review.user.toString() !== req.user._id.toString()) {
          throw new Error("You are not allowed to delete this review");
        }
      }
    }),
  validatorMiddleware,
];
