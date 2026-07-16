const express = require("express");
//const {
//  getUserValidator,
// createUserValidator,
//updateUserValidator,
//deleteUserValidator,
//} = require("../utils/validators/UserValidator");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getUsers).post(uploadUserImage, resizeImage, createUser);
router
  .route("/:id")
  .get(getUser)
  .patch(uploadUserImage, resizeImage, updateUser)
  .delete(deleteUser);

module.exports = router;
