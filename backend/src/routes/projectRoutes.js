import express from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";
import { uploadImage } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", uploadImage("projects").single("image"), createProject);
router.delete("/:id", deleteProject);
router.put("/:id", uploadImage("projects").single("image"), updateProject);

export default router;
