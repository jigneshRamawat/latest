// Server/api/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import postRoutes from "../routes/postRoutes.js";

dotenv.config();

const app = express();

// __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allow CORS
app.use(cors());
app.use(express.json());
// Serve uploads statically (only for local testing, Vercel won't use this)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Mount routes
app.use("/posts", postRoutes);

// Connect to MongoDB (ensure MONGO_URI in Vercel env)
let connected = false;
async function ensureDbConnection() {
  if (!connected) {
    await mongoose.connect(process.env.MONGO_URI, { });
    connected = true;
    console.log("✅ MongoDB Connected");
  }
}
// don't await at import-time on serverless cold start — ensure on each request
app.use(async (req, res, next) => {
  try {
    await ensureDbConnection();
    next();
  } catch (err) {
    console.error("DB connect error:", err);
    res.status(500).json({ message: "DB connection failed", error: err.message });
  }
});

// Export the app as the default export — Vercel will invoke it.
export default app;
