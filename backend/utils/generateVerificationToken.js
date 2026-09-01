export const generateVerificationToken = () => {
  const token = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes
  return { token, expiresAt };
};
