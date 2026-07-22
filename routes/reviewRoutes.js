const express = require("express");

const {
  createReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/validators/reviewValidators");

const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router
  .route("/")
  .get(getReviews)
  .post(
    authController.protect,
    createReviewValidator,
    authController.allowedTo("user"),
    createReview,
  );
router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .patch(
    authController.protect,
    authController.allowedTo("user"),
    updateReviewValidator,
    updateReview,
  )
  .delete(authController.protect, deleteReviewValidator, deleteReview);

module.exports = router;
