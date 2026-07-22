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
  setproductIdToBody,
  createFilterObj,
} = require("../controllers/reviewController");

const authController = require("../controllers/authContoller");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getReviews)
  .post(
    authController.protect,
    authController.allowedTo("user"),
    setproductIdToBody,
    createReviewValidator,
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
