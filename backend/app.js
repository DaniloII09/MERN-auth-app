import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { connectDB } from "./db/connectDB.js";
import { sanitizeMongo } from "./middlewares/sanitizeMongo.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.set("trust proxy", 1);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(sanitizeMongo);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Running on port ${PORT}`);
});
