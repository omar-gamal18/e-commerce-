const express = require("express");

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
} = require("../controllers/cartController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

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
