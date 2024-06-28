const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/signup",authController.SignUp);
router.post("/login",authController.Login);
router.post("/logout",authController.Logout);

module.exports = router;