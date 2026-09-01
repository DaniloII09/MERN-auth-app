import express from "express";
import {
  login,
  logout,
  signup,
  resendVerificationEmail,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import {
  authLimiter,
  resendVerificationLimiter,
  verifyEmailLimiter,
  forgotPasswordLimiter,
} from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/signup", authLimiter, signup);

router.post(
  "/resend-verification-email",
  resendVerificationLimiter,
  resendVerificationEmail,
);
router.post("/verify-email", verifyEmailLimiter, verifyEmail);

router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/login", authLimiter, login); 
router.post("/logout", logout);

export default router;
