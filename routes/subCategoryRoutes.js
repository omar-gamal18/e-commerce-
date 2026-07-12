const express = require("express");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const {
  createSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/subCategoryController");

const router = express.Router();

router
  .route("/")
  .get(getAllSubCategories)
  .post(createSubCategoryValidator, createSubCategory);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .patch(updateSubCategoryValidator, updateCategory)
  .delete(deleteSubCategoryValidator, deleteCategory);

module.exports = router;
