import express from "express";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/mongoDBConfig.js"; // ✅ renamed for consistency
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable CORS (important for frontend-backend communication)
app.use(cors());

// Parse JSON & URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/attendance", attendanceRoutes);

// Serve frontend (React build)
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("✅ API is running....");
  });
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
