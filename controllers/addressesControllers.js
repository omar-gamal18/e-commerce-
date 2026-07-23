const ApiError = require("../utils/apiError");

const User = require("../models/userModel");

exports.addAddress = async (req, res, next) => {
  const { alias, details, phone } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        addresses: { alias, details, phone },
      },
    },
    { new: true, runValidators: true },
  );

  if (!user) {
    return next(new ApiError("the user not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "address added to your profile",
    data: {
      addresses: user.addresses,
    },
  });
};

exports.removeAddress = async (req, res, next) => {
  const { addressId } = req.params;

  if (!addressId) {
    return next(new ApiError("address id is required", 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: addressId } },
    },
    { new: true },
  );

  if (!user) {
    return next(new ApiError("the user not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "address removed from your profile",
    data: {
      addresses: user.addresses,
    },
  });
};

exports.getLoggedUserAddresses = async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("addresses");

  const userAddresses = user.addresses;

  res.status(200).json({
    status: "success",
    results: userAddresses.length,
    data: userAddresses,
  });
};
