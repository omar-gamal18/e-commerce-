const sharp = require("sharp");

const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");
const Product = require("../models/productModel");
const Factory = require("./handlersFactory");

exports.uploadProductsImages = uploadMixOfImages([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

exports.resizeProductsImages = async (req, res, next) => {
  if (req.files.imageCover) {
    const imageCoverName = `product-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${imageCoverName}`);

    req.body.imageCover = imageCoverName;
  }

  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${Date.now()}-${index + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`uploads/products/${imageName}`);

        req.body.images.push(imageName);
      }),
    );
  }

  next();
};

exports.getAllProducts = Factory.getAll(Product, "Products");
exports.getProduct = Factory.getOne(Product);
exports.createProduct = Factory.createOne(Product);
exports.updateProduct = Factory.updateOne(Product);
exports.deleteProduct = Factory.deleteOne(Product);
