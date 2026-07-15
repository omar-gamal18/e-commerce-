const express = require("express");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductsImages,
  resizeProductsImages,
} = require("../controllers/productController");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    uploadProductsImages,
    resizeProductsImages,
    createProductValidator,
    createProduct,
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .patch(
    uploadProductsImages,
    resizeProductsImages,
    updateProductValidator,
    updateProduct,
  )
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
