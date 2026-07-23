const express = require("express");

const {
  addProductToWishlist,
  removeProductFromWishlist,
} = require("../controllers/wishlistController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router.post(
  "/",
  authController.protect,
  authController.allowedTo("user"),
  addProductToWishlist,
);

router.delete(
  "/:id",
  authController.protect,
  authController.allowedTo("user"),
  removeProductFromWishlist,
);

module.exports = router;
