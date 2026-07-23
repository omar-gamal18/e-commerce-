const express = require("express");

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require("../controllers/cartController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router.patch("/applyCoupon", applyCoupon);

router
  .route("/")
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);
router
  .route("/:itemId")
  .patch(updateCartItemQuantity)
  .delete(removeSpecificCartItem);

module.exports = router;
