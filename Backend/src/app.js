import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authrouter from "./routes/auth.routes.js";
import projectroute from "./routes/project.route.js";
import contactRoute from "./routes/contact.route.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://YOUR-FRONTEND.vercel.app"
  ],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// ✅ ROUTES
app.use("/api/auth", authrouter);
app.use("/api/project", projectroute);
app.use("/api/contact", contactRoute);

// ✅ test route
app.get("/", (req, res) => {
  res.send("Backend running fine 🚀");
});

export default app;
