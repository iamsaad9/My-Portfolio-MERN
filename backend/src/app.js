// dotenv.config({ path: "./src/.env" }); // MUST be first
import "./loadEnv.js";
import express from "express";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import passport from "passport"; // 1. Add this
import "./config/passport.js"; // 2. Add this (Important: trigger the strategy setup)
import cookieParser from "cookie-parser"; // 3. Add this for JWT reading
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser()); // Required to read the JWT from cookies later
app.use(
  cors({
    origin: "http://localhost:5173", // Be specific for cookies to work
    credentials: true,
  })
);

app.use(passport.initialize());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/about", aboutRoutes);

//authRoutes
app.use("/auth", authRoutes);

connectDB();

app.listen(port, () => {
  console.log("Server is running on port", port);
});
