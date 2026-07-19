const express = require("express");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../controllers/brandController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router
  .route("/")
  .get(getBrands)
  .post(
    authController.protect,
    authController.allowedTo("admin"),
    createBrandValidator,
    uploadBrandImage,
    resizeImage,
    createBrand,
  );
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .patch(
    authController.protect,
    authController.allowedTo("admin"),
    updateBrandValidator,
    uploadBrandImage,
    resizeImage,
    updateBrand,
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleteBrandValidator,
    deleteBrand,
  );

module.exports = router;
