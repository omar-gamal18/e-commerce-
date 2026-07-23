const express = require("express");

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
} = require("../controllers/cartController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router.route("/").post(addProductToCart).get(getLoggedUserCart);
router.route("/:itemId").delete(removeSpecificCartItem);

module.exports = router;
