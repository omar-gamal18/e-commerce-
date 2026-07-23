const ApiError = require("../utils/apiError");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const calcTotalPrise = (cart) =>
  cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

exports.addProductToCart = async (req, res, next) => {
  const { productId, color, quantity = 1 } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [
        { product: productId, color, quantity, price: product.price },
      ],
    });
  } else {
    const cartItemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color,
    );

    if (cartItemIndex !== -1) {
      cart.cartItems[cartItemIndex].quantity += quantity;
    } else {
      cart.cartItems.push({
        product: productId,
        color,
        quantity,
        price: product.price,
      });
    }
  }

  cart.totalPrice = calcTotalPrise(cart);

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Product added to cart",
    numOfCartItems: cart.cartItems.length,
    totalPrice: cart.totalPrice,
    data: cart,
  });
};

exports.getLoggedUserCart = async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      shoppingCart: cart.cartItems,
    },
  });
};

exports.removeSpecificCartItem = async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartItems: { _id: req.params.itemId } },
    },
    { new: true, runValidators: true },
  );

  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  cart.totalPrice = calcTotalPrise(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Item removed from cart",
    numOfCartItems: cart.cartItems.length,
    totalPrice: cart.totalPrice,
    data: cart,
  });
};
