import express from "express";

import { aboutUpload } from "../middleware/upload.js";
import {
  addAbout,
  getAbout,
  updateAbout,
} from "../controllers/aboutController.js";

const router = express.Router();

router.get("/", getAbout);
router.post("/", aboutUpload, addAbout);
router.put("/:id", aboutUpload, updateAbout);

export default router;
