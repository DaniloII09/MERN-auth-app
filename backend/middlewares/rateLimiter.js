import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // 10 attempts per 15 minutes
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many attempts, please try again later" },
});

export const resendLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 1, // 1 attempt per minute
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Please wait before requesting another code" },
});

export const verifyEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // 5 attempts per 15 minutes
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many verification attempts, please try again later" },
});
