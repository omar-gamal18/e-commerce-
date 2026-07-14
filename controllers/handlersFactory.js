const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAll =
  (Model, modelName = "") =>
  async (req, res, next) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const documentCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentCounts)
      .filter()
      .search(modelName)
      .sort()
      .limitFields();

    const { mongooseQuery, paginationResult } = apiFeatures;

    const documents = await mongooseQuery;

    res.status(200).json({
      results: documents.length,
      paginationResult,
      data: { documents },
    });
  };

exports.getOne = (Model) => async (req, res, next) => {
  const document = await Model.findById(req.params.id);

  if (!document) {
    return next(new ApiError("No document With This Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: { document },
  });
};

exports.createOne = (Model) => async (req, res) => {
  const newDocument = await Model.create(req.body);
  res.status(201).json({ data: newDocument });
};

exports.updateOne = (Model) => async (req, res, next) => {
  const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
  });

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
};

exports.deleteOne = (Model) => async (req, res, next) => {
  const { id } = req.params;
  const document = await Model.findByIdAndDelete(id);

  if (!document) {
    return next(new ApiError(`No ${Model} for this id ${id}`, 404));
  }
  res.status(204).send();
};
