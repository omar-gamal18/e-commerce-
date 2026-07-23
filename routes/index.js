const categoryRouter = require("./categoryRoutes");
const subCategoryRouter = require("./subCategoryRoutes");
const brandRoute = require("./brandRoutes");
const productRoute = require("./productRoutes");
const reviewRoute = require("./reviewRoutes");
const userRoute = require("./userRoutes");
const wishlistRoute = require("./wishlistRoutes");
const addressRoute = require("./addressRoutes");
const couponRoute = require("./couponRoutes");
const cartRoute = require("./cartRoutes");
const authRote = require("./authRotes");

const mountRoutes = (app) => {
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategories", subCategoryRouter);
  app.use("/api/v1/brands", brandRoute);
  app.use("/api/v1/products", productRoute);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/auth", authRote);
  app.use("/api/v1/reviews", reviewRoute);
  app.use("/api/v1/wishlists", wishlistRoute);
  app.use("/api/v1/address", addressRoute);
  app.use("/api/v1/coupons", couponRoute);
  app.use("/api/v1/cart", cartRoute);
};

module.exports = mountRoutes;
