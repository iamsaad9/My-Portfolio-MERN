// dotenv.config({ path: "./src/.env" }); // MUST be first
import "./loadEnv.js";
import express from "express";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/about", aboutRoutes);

connectDB();

app.listen(port, () => {
  console.log("Server is running on port", port);
});
