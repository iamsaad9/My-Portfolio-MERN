import express from "express";
import {
  getAllServices,
  addService,
  deleteService,
  updateService,
} from "../controllers/servicesController.js";
import { serviceUpload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllServices);
router.post("/", serviceUpload, addService);
router.delete("/:id", deleteService);
router.put("/:id", serviceUpload, updateService);

export default router;
