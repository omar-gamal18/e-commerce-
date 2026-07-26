const express = require("express");

const {
  createCashOrder,
  getOrder,
  getAllOrders,
} = require("../controllers/orderController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router.get("/getAllOrders", getAllOrders);
router.route("/:id").get(getOrder);

router.route("/:cartId").post(createCashOrder);

module.exports = router;
