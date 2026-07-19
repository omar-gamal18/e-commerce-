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

const authController = require("../controllers/authContoller");

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(
    authController.protect,
    authController.allowedTo("admin"),
    createProductValidator,
    uploadProductsImages,
    resizeProductsImages,
    createProduct,
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .patch(
    authController.protect,
    authController.allowedTo("admin"),
    updateProductValidator,
    uploadProductsImages,
    resizeProductsImages,
    updateProduct,
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleteProductValidator,
    deleteProduct,
  );

module.exports = router;
