const express = require("express");

const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require("../controllers/wishlistController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router.route("/").post(addProductToWishlist).get(getLoggedUserWishlist);

router.delete("/:id", removeProductFromWishlist);

module.exports = router;
