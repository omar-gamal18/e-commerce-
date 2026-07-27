const express = require("express");

const {
  createCashOrder,
  getOrder,
  getAllOrders,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../controllers/orderController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router.use(authController.protect);

router.get(
  "/",
  authController.allowedTo("user", "admin"),
  filterOrderForLoggedUser,
  getAllOrders,
);
router.route("/:id").get(authController.allowedTo("user", "admin"), getOrder);

router
  .route("/:cartId")
  .post(authController.allowedTo("user"), createCashOrder);

router.use(authController.allowedTo("admin"));
router.patch("/:id/pay", updateOrderToPaid);
router.patch("/:id/deliver", updateOrderToDelivered);

module.exports = router;
