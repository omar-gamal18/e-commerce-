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

const router = express.Router();

router
  .route("/")
  .get(getBrands)
  .post(createBrandValidator, uploadBrandImage, resizeImage, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .patch(updateBrandValidator, uploadBrandImage, resizeImage, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
