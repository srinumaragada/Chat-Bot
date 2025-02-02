const express = require("express");
const { RegisterUser } = require("../Controllers/User.controller");
const { sendVerificationEmail, verifyEmailCode } = require("../Controllers/MailController");

const router = express.Router();

router.post("/register",RegisterUser)
router.post("/send-verification-email", sendVerificationEmail);
router.post("/verify-email", verifyEmailCode);


module.exports = router;