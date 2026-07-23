const express = require("express");

const { addProductToCart } = require("../controllers/cartController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router.route("/").post(addProductToCart);

module.exports = router;
