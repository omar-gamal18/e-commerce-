const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");

const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");

exports.createCashOrder = async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;
  // 1) Get cart depend on cartId
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(new ApiError("no cart found with this id", 404));
  }

  const orderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice: orderPrice + taxPrice + shippingPrice,
  });

  if (order) {
    const bulkOpts = cart.cartItems.map((item) => ({
      updateOne: {
        filter: {
          _id: item.product,
          quantity: { $gte: item.quantity },
        },
        update: {
          $inc: { quantity: -item.quantity, sold: item.quantity },
        },
      },
    }));

    await Product.bulkWrite(bulkOpts, {});

    await Cart.findByIdAndDelete(req.params.cartId);
  }

  res.status(201).json({
    status: "success",
    data: order,
  });
};

exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
