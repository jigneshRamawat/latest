import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authrouter from "./routes/auth.routes.js";
import projectroute from './routes/project.route.js';
import contactRoutes from "./routes/contact.route.js"; // contact route
import cors from "cors";

const app = express();

app.use(cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Admin routes
app.use("/api/auth", authrouter);
app.use("/api/project", projectroute);

// 🔹 Contact route fix
// Backend route: /api/contact
app.use("/api/contact", contactRoutes); // ✅ correct path

export default app;
