import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

const EMAILS_ENABLED = process.env.EMAILS_ENABLED !== "false";

const sendEmail = async ({ email, subject, html, category }) => {
  if (!EMAILS_ENABLED) {
    console.log(`[EMAILS DISABLED] Skipped "${category}" to ${email}`);
    return { skipped: true };
  }

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: [{ email }],
      subject,
      html,
      category,
    });

    console.log(`[${category}] sent successfully`, response);
    return response;
  } catch (error) {
    console.error(`Error sending [${category}]:`, error.message);
    throw error;
  }
};

export const sendVerificationEmail = (email, verificationToken) =>
  sendEmail({
    email,
    subject: "Verify your email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken,
    ),
    category: "Email Verification",
  });

export const sendWelcomeEmail = (email, name) =>
  sendEmail({
    email,
    subject: "Welcome to Our App!",
    html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
    category: "Welcome Email",
  });

export const sendPasswordResetEmail = (email, resetURL) =>
  sendEmail({
    email,
    subject: "Reset Your Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    category: "Password Reset Request Email",
  });

export const sendPasswordResetSuccessEmail = (email) =>
  sendEmail({
    email,
    subject: "Password Reset Successful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    category: "Password Reset Success Email",
  });