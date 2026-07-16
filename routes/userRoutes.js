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
} = require("../controllers/userController");

const router = express.Router();

router.patch(
  "/changeMyPassword/:id",
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
