const express = require("express");
const multer = require("multer");

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
} = require("../controllers/categoryController");

const router = express.Router();

router.use("/:categoryId/subcategories", subCategoryRouter);

const upload = multer({ dest: "uploads/categories" });

router
  .route("/")
  .get(getAllCategories)
  .post(
    upload.single("image"),
    (req, res, next) => {
      console.log(req.file);
      next();
    },
    createCategoryValidator,
    createCategory,
  );

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
