const express = require("express");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const {
  getAllProducts,
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
  .get(getAllProducts)
  .post(
    createProductValidator,
    uploadProductsImages,
    resizeProductsImages,
    createProduct,
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .patch(
    updateProductValidator,
    uploadProductsImages,
    resizeProductsImages,
    updateProduct,
  )
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
