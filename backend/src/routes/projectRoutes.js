import express from "express";
import {
  getAllProjects,
  getProjectById,
  addProject,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";
import { projectUpload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", projectUpload, addProject);
router.delete("/:id", deleteProject);
router.put("/:id", projectUpload, updateProject);

export default router;
