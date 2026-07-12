const express = require("express");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const {
  createSubCategory,
  getAllSubCategories,
  getSubCategory,
} = require("../controllers/subCategoryController");

const router = express.Router();

router
  .route("/")
  .get(getAllSubCategories)
  .post(createSubCategoryValidator, createSubCategory);

router.route("/:id").get(getSubCategoryValidator, getSubCategory);

module.exports = router;
