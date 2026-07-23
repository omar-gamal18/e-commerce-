const Factory = require("./handlersFactory");
const Coupon = require("../models/couponModel");

exports.getCoupons = Factory.getAll(Coupon);
exports.getCoupon = Factory.getOne(Coupon);
exports.createCoupon = Factory.createOne(Coupon);
exports.updateCoupon = Factory.updateOne(Coupon);
exports.deleteCoupon = Factory.deleteOne(Coupon);
