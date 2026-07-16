const express = require("express");

const { signUpValidator } = require("../utils/validators/authValidators");
const { signUp } = require("../controllers/authContoller");

const router = express.Router();

router.route("/signup").post(signUpValidator, signUp);

module.exports = router;
