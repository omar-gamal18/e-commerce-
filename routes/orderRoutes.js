const express = require("express");

const { createCashOrder } = require("../controllers/orderController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router.route("/:cartId").post(createCashOrder);

module.exports = router;
