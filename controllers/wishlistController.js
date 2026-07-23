const ApiError = require("../utils/apiError");

const User = require("../models/userModel");

exports.addProductToWishlist = async (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    return next(new ApiError("product id is required", 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: productId },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!user) {
    return next(new ApiError("the user not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "product added to your wishlist",
    data: {
      wishlist: user.wishList,
    },
  });
};

exports.removeProductFromWishlist = async (req, res, next) => {
  const productId = req.params.id || req.body.productId;

  if (!productId) {
    return next(new ApiError("product id is required", 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishList: productId },
    },
    { new: true },
  );

  if (!user) {
    return next(new ApiError("the user not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "product removed from your wishlist",
    data: {
      wishlist: user.wishList,
    },
  });
};
