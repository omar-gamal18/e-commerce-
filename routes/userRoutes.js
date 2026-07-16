const express = require("express");
//const {
//  getUserValidator,
// createUserValidator,
//updateUserValidator,
//deleteUserValidator,
//} = require("../utils/validators/UserValidator");

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
} = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(uploadUserImage, resizeImage, createUser);
router
  .route("/:id")
  .get(getUser)
  .patch(uploadUserImage, resizeImage, updateUser)
  .delete(deleteUser);

module.exports = router;
