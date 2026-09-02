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
  resetPasswordLimiter,
} from "../middlewares/rateLimiter.js";
import { validate } from "../middlewares/validate.js";
import {
  signupValidator,
  loginValidator,
  emailValidator,
  verifyEmailValidator,
  resetPasswordValidator,
} from "../middlewares/validators/auth.validator.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", authLimiter, signupValidator, validate, signup);
router.post("/login", authLimiter, loginValidator, validate, login);
router.post("/logout", logout);

router.post(
  "/resend-verification-email",
  resendVerificationLimiter,
  emailValidator,
  validate,
  resendVerificationEmail,
);
router.post(
  "/verify-email",
  verifyEmailLimiter,
  verifyEmailValidator,
  validate,
  verifyEmail,
);

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  emailValidator,
  validate,
  forgotPassword,
);
router.post(
  "/reset-password/:token",
  resetPasswordLimiter,
  resetPasswordValidator,
  validate,
  resetPassword,
);

export default router;
