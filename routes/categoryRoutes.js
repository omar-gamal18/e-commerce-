const express = require("express");

const subCategoryRouter = require("./subCategoryRoutes");

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
  uploadCategoryImage,
  resizeImage,
} = require("../controllers/categoryController");

const router = express.Router();

router.use("/:categoryId/subcategories", subCategoryRouter);

router
  .route("/")
  .get(getAllCategories)
  .post(
    createCategoryValidator,
    uploadCategoryImage,
    resizeImage,
    createCategory,
  );

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .patch(
    updateCategoryValidator,
    uploadCategoryImage,
    resizeImage,
    updateCategory,
  )
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
