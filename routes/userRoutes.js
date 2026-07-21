const express = require("express");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  changeUserPassword,
  deleteUser,
  uploadUserImage,
  resizeImage,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
} = require("../controllers/userController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router.get("/getMe", authController.protect, getLoggedUserData, getUser);
router.patch(
  "/updateMyPassword",
  authController.protect,
  updateLoggedUserPassword,
);
router.patch(
  "/updateMe",
  authController.protect,
  updateUserValidator,
  updateLoggedUserData,
);

router.patch(
  "/changePassword/:id",
  authController.protect,
  changeUserPasswordValidator,
  changeUserPassword,
);

router
  .route("/")
  .get(authController.protect, authController.allowedTo("admin"), getAllUsers)
  .post(
    authController.protect,
    authController.allowedTo("admin"),
    createUserValidator,
    uploadUserImage,
    resizeImage,
    createUser,
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.allowedTo("admin"),
    getUserValidator,
    getUser,
  )
  .patch(
    authController.protect,
    authController.allowedTo("admin"),
    updateUserValidator,
    uploadUserImage,
    resizeImage,
    updateUser,
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleteUserValidator,
    deleteUser,
  );

module.exports = router;
