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

const authController = require("../controllers/authContoller");

const router = express.Router();

router.use("/:categoryId/subcategories", subCategoryRouter);

router
  .route("/")
  .get(getAllCategories)
  .post(
    authController.protect,
    authController.allowedTo("admin"),
    createCategoryValidator,
    uploadCategoryImage,
    resizeImage,
    createCategory,
  );

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .patch(
    authController.protect,
    authController.allowedTo("admin"),
    updateCategoryValidator,
    uploadCategoryImage,
    resizeImage,
    updateCategory,
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleteCategoryValidator,
    deleteCategory,
  );

module.exports = router;
