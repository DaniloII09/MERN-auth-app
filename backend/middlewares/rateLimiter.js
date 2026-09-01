import rateLimit from "express-rate-limit";

const createRateLimiter = (windowMs, limit, message) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { message },
  });

export const authLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  10, // limit each IP to 10 requests per windowMs
  "Too many attempts, please try again later",
);

export const verifyEmailLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // limit each IP to 5 requests per windowMs
  "Too many verification attempts, please try again later",
);

export const resendVerificationCodeLimiter = createRateLimiter(
  60 * 1000, // 1 minute
  1, // limit each IP to 1 request per windowMs
  "Please wait before requesting another code",
);

export const forgotPasswordLimiter = createRateLimiter(
  60 * 1000, // 1 minute
  1, // limit each IP to 1 request per windowMs
  "Please wait before requesting another reset link",
);