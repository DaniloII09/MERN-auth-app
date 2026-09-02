import { body, param } from "express-validator";
import { isCommonPassword } from "../../utils/commonPaswords";

const passwordRules = () =>
  body("password")
    .isString()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .not()
    .matches(/^\s|\s$/)
    .withMessage("Password cannot start or end with a space")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character")
    .custom((value) => {
      if (isCommonPassword(value)) {
        throw new Error("This password is too common, please choose another");
      }
      return true;
    });

export const signupValidator = [
  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Invalid email format"),
  passwordRules(),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be at most 50 characters"),
];

export const loginValidator = [
  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const emailValidator = [
  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Invalid email format"),
];

export const verifyEmailValidator = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Verification code is required")
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage("Verification code must be 6 digits"),
];

export const resetPasswordValidator = [
  param("token").notEmpty().withMessage("Reset token is required"),
  passwordRules(),
];
