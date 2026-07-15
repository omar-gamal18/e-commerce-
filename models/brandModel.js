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

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};
// findOne, findAll and update
BrandSchema.post("init", (doc) => {
  setImageURL(doc);
});

// create
BrandSchema.post("save", (doc) => {
  setImageURL(doc);
});

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
