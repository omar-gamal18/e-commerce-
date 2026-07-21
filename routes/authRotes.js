const express = require("express");

const {
  signUpValidator,
  loginValidator,
} = require("../utils/validators/authValidators");
const {
  signUp,
  login,
  forgotPassword,
  verifyPassResetPassword,
} = require("../controllers/authContoller");

const router = express.Router();

router.route("/signup").post(signUpValidator, signUp);
router.route("/login").post(loginValidator, login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/verifyPassResetPassword").post(verifyPassResetPassword);

module.exports = router;
