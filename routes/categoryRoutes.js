const express = require("express");
// eslint-disable-next-line import/no-extraneous-dependencies

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

const subCategoryRouter = require("./subCategoryRoutes");

router
  .route("/")
  .get(getAllCategories)
  .post(createCategoryValidator, createCategory);

router.use("/:categoryId/subcategories", subCategoryRouter);

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
