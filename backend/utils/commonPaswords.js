import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "data", "common-passwords.txt");

const commonPasswords = new Set(
  fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean),
);

console.log(`Loaded ${commonPasswords.size} common passwords`);

export const isCommonPassword = (password) =>
  commonPasswords.has(password.toLowerCase());
