import express from "express";
import {
  login,
  logout,
  signup,
  resendVerificationEmail,
  verifyEmail,
  forgotPassword,
} from "../controllers/auth.controller.js";
import {
  authLimiter,
  resendVerificationCodeLimiter,
  verifyEmailLimiter,
  forgotPasswordLimiter,
} from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/signup", authLimiter, signup);
router.post(
  "/resend-verification-email",
  resendVerificationCodeLimiter,
  resendVerificationEmail,
);
router.post("/verify-email", verifyEmailLimiter, verifyEmail);
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);

router.post("/login", authLimiter, login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

export default router;
