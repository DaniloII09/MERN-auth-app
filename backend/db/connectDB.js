import mongoose from "mongoose";
import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connection to MongoDB", error.message);
    process.exit(1);
  }
};
