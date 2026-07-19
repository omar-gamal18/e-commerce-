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
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require("../controllers/subCategoryController");

const authController = require("../controllers/authContoller");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getAllSubCategories)
  .post(
    authController.protect,
    authController.allowedTo("admin"),
    setCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategory,
  );

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .patch(
    authController.protect,
    authController.allowedTo("admin"),
    updateSubCategoryValidator,
    updateSubCategory,
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleteSubCategoryValidator,
    deleteSubCategory,
  );

module.exports = router;
