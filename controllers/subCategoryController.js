const slugify = require("slugify");

const SubCategory = require("../models/subCategoryModel");
//const ApiError = require("../utils/apiError");

exports.createSubCategory = async (req, res, next) => {
  const { name, category } = req.body;

  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });

  res.status(201).json({
    status: "success",
    data: { subCategory },
  });
};
