const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST ,
  port: process.env.SMTP_PORT ,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found." });

    const code = crypto.randomInt(100000, 999999).toString();
    const hashedCode = await bcrypt.hash(code, 10);

    user.verificationCode = hashedCode;
    user.verificationCodeExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transport.sendMail({
      from: '"Demo App" <no-reply@demo.com>',
      to: email,
      subject: "Email Verification",
      text: `Your verification code is ${code}`,
    });

    res.json({ success: true, message: "Verification email sent.",data:user});
  } catch (error) {
    res.status(500).json(
      { success: false,
         message: "Error sending email."
        
        });
  }
};

const verifyEmailCode = async (req, res) => {
  const { email, verificationCode } = req.body;
  console.log("Received email:", email);
  console.log("Received code:", verificationCode);
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found." });

    if (!user.verificationCode || user.verificationCodeExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code.",
      });
    }

    const isCodeValid = await bcrypt.compare(verificationCode, user.verificationCode);
    if (!isCodeValid) {
      return res.status(400).json({ success: false, message: "Invalid code." });
    }

    user.verificationCode = null;
    user.verificationCodeExpires = null;
    user.isEmailVerified = true;
    await user.save();

    res.json({ success: true, message: "Email verified successfully.",data:user });
  } catch (error) {
    res.status(500).json({ success: false, message: `Error verifying code.${error.message}` });
  }
};

module.exports = { sendVerificationEmail, verifyEmailCode };
