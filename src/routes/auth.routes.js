const express = require("express");
const router = express.Router();
const { registerUser , loginUser , logoutUser } = require("../controllers/auth.controller")
const { registerValidation, loginValidation, validate } = require("../middlewares/validation.middleware");

router.post("/register", registerValidation, validate, registerUser)
router.post("/login", loginValidation, validate, loginUser)
router.post("/logout", logoutUser)

module.exports = router;

