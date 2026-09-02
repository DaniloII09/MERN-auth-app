import express from "express";
import {
  login,
  logout,
  signup,
  resendVerificationEmail,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";
import {
  authLimiter,
  resendVerificationLimiter,
  verifyEmailLimiter,
  forgotPasswordLimiter,
  resetPasswordLimiter
} from "../middlewares/rateLimiter.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login); 
router.post("/logout", logout);

router.post(
  "/resend-verification-email",
  resendVerificationLimiter,
  resendVerificationEmail,
);
router.post("/verify-email", verifyEmailLimiter, verifyEmail);

router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.post("/reset-password/:token", resetPasswordLimiter, resetPassword);

export default router;
