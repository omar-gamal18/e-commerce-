class ApiFeatures {
  constructor(mongooseQuery, queryStrObj) {
    this.mongooseQuery = mongooseQuery;
    this.queryStrObj = queryStrObj;
  }

  filter() {
    const queryStrObj = { ...this.queryStrObj };
    const excludesFields = ["sort", "limit", "page", "fields", "keyword"];
    excludesFields.forEach((field) => delete queryStrObj[field]);

    // Apply filtration using [gte, gt, lte, lt]
    let queryStr = JSON.stringify(queryStrObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }

  search() {
    if (this.queryStrObj.keyword) {
      const query = {};
      query.$or = [
        { title: { $regex: this.queryStrObj.keyword, $options: "i" } },
        { description: { $regex: this.queryStrObj.keyword, $options: "i" } },
      ];

      this.mongooseQuery = this.mongooseQuery.find(query);
    }
  }

  sort() {
    if (this.queryStrObj.sort) {
      const sortBy = this.queryStrObj.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryStrObj.fields) {
      const fields = this.queryStrObj.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = this.queryStrObj.page * 1 || 1;
    const limit = this.queryStrObj.limit * 1 || 20;
    const skip = (page - 1) * limit;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = { page, limit };
    return this;
  }
}

module.exports = ApiFeatures;
