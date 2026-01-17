import "./loadEnv.js";
import express from "express";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import passport from "passport";
import "./config/passport.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// 1. TRUST PROXY (Must be at the top)
app.set("trust proxy", 1);

// 2. CORS CONFIGURATION
const allowedOrigins = [
  "https://saad-masood.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  }),
);

// 3. MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// 4. ROUTES
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/about", aboutRoutes);
app.use("/auth", authRoutes); // This contains your login logic

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
