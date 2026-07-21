const express = require("express");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserDataValidator,
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
  deleteLoggedUserData,
} = require("../controllers/userController");

const authController = require("../controllers/authContoller");

const router = express.Router();

router.use(authController.protect);

router.get("/getMe", getLoggedUserData, getUser);
router.patch("/updateMyPassword", updateLoggedUserPassword);
router.patch("/updateMe", updateLoggedUserDataValidator, updateLoggedUserData);
router.delete("/deleteMe", deleteLoggedUserData);

router.use(authController.allowedTo("admin"));

router.patch(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword,
);

router
  .route("/")
  .get(getAllUsers)
  .post(createUserValidator, uploadUserImage, resizeImage, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .patch(updateUserValidator, uploadUserImage, resizeImage, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
