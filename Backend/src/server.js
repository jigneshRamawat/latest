import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDb from "./db.js";
import contactRoutes from "./routes/contact.route.js"; // 👈 ADD

connectDb();

// 👇 ADD THIS
app.use("/api", contactRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
