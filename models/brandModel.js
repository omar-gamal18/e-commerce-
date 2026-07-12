const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand required"],
      unique: [true, "brand must be unique"],
      minlength: [3, "Too short brand name"],
      maxlength: [32, "Too long brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true },
);

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
