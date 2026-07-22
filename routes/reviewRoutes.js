const express = require("express");

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
  .post(authController.protect, authController.allowedTo("user"), createReview);
router
  .route("/:id")
  .get(getReview)
  .patch(authController.protect, authController.allowedTo("user"), updateReview)
  .delete(authController.protect, deleteReview);

module.exports = router;
