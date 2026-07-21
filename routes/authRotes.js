const express = require("express");

const {
  signUpValidator,
  loginValidator,
} = require("../utils/validators/authValidators");
const {
  signUp,
  login,
  forgetPassword,
} = require("../controllers/authContoller");

const router = express.Router();

router.route("/signup").post(signUpValidator, signUp);
router.route("/login").post(loginValidator, login);
router.route("/forgetPassword").post(forgetPassword);

module.exports = router;
