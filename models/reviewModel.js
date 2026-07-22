const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    ratings: {
      type: Number,
      min: [1, "Min ratings value is 1.0"],
      max: [5, "Max ratings value is 5.0"],
      required: [true, "Please provide ratings"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to user"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to product"],
    },
  },
  { timestamps: true },
);

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (
  productId,
) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },

    {
      $group: {
        _id: "$product",
        ratingsQuantity: { $sum: 1 },
        ratingsAverage: { $avg: "$ratings" },
      },
    },
  ]);

  if (stats.length > 0) {
    await mongoose.model("Product").findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].ratingsQuantity,
      ratingsAverage: stats[0].ratingsAverage,
    });
  } else {
    await mongoose.model("Product").findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      ratingsAverage: 0,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatingsAndQuantity(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.review = await this.model.findOne(this.getQuery());
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  if (this.review) {
    await this.review.constructor.calcAverageRatingsAndQuantity(
      this.review.product,
    );
  }
});

reviewSchema.pre(/^find/, function () {
  this.populate({ path: "user", select: "name -_id" });
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
