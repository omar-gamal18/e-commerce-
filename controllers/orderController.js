const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");

exports.createCashOrder = async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;

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

exports.getOrder = async (req, res, next) => {
  const filter = { _id: req.params.id };

  if (req.user.role === "user") {
    filter.user = req.user._id;
  }

  const order = await Order.findOne(filter);

  if (!order) {
    return next(new ApiError("No order found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: { order },
  });
};

exports.filterOrderForLoggedUser = async (req, res, next) => {
  if (req.user.role === "user") req.filterObj = { user: req.user._id };
  next();
};

exports.getAllOrders = factory.getAll(Order);

exports.updateOrderToPaid = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(
        `There is no such a order with this id:${req.params.id}`,
        404,
      ),
    );
  }

  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({ status: "success", data: updatedOrder });
};

exports.updateOrderToDelivered = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(
        `There is no such a order with this id:${req.params.id}`,
        404,
      ),
    );
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({ status: "success", data: updatedOrder });
};

exports.checkoutSession = async (req, res, next) => {
  // app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(
      new ApiError(`There is no such cart with id ${req.params.cartId}`, 404),
    );
  }

  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  console.log({
    cartPrice,
    totalPriceAfterDiscount: cart.totalPriceAfterDiscount,
    totalCartPrice: cart.totalPrice,
  });

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
  console.log({ totalOrderPrice });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: Math.round(totalOrderPrice * 100),
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/orders`,
    cancel_url: `${req.protocol}://${req.get("host")}/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: req.body.shippingAddress || {},
  });

  res.status(200).json({ status: "success", session });
};

exports.webhookCheckout = async (req, res, next) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    console.log("checkout.session.completed");
    //const session = event.data.object;
    //const cartId = session.client_reference_id;
    //const shippingAddress = session.metadata;
  }
};
