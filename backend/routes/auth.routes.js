import express from "express";
import { login, logout, signup, resendVerificationEmail, verifyEmail, forgotPassword } from "../controllers/auth.controller.js";
import { authLimiter, resendLimiter, verifyEmailLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/signup", authLimiter, signup);
router.post("/resend-verification-email", resendLimiter, resendVerificationEmail);
router.post("/verify-email", verifyEmailLimiter, verifyEmail);

router.post("/login", authLimiter, login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

export default router;
