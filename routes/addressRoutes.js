const express = require("express");

const authController = require("../controllers/authContoller");

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require("../controllers/addressesControllers");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router.route("/").post(addAddress).get(getLoggedUserAddresses);

router.delete("/:addressId", removeAddress);

module.exports = router;
