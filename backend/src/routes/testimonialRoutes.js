import express from "express";
import {
  getAllTestimonials,
  addTestimonial,
  deleteTestimonial,
  updateTestimonial,
  getTestimonialById,
} from "../controllers/testimonialController.js";
import { testimonialUpload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllTestimonials);
router.get("/:id", getTestimonialById);
router.post("/", testimonialUpload, addTestimonial);
router.put("/:id", testimonialUpload, updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
