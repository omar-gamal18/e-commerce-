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
  resetPassword,
} = require("../controllers/authContoller");

const router = express.Router();

router.route("/signup").post(signUpValidator, signUp);
router.route("/login").post(loginValidator, login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/verifyPassResetPassword").post(verifyPassResetPassword);
router.route("/resetPassword").patch(resetPassword);

module.exports = router;
