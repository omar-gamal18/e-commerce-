const express = require("express");

const {
  createCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponsController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("admin"));

router.route("/").get(getCoupons).post(createCoupon);
router.route("/:id").get(getCoupon).patch(updateCoupon).delete(deleteCoupon);

module.exports = router;
