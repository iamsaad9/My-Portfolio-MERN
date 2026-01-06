import Services from "../../models/Services.js";
import { uploadToAppwrite } from "../utils/appwriteUpload.js";

export async function getAllServices(req, res) {
  try {
    const services = await Services.find().sort({ createdAt: 1 });
    return res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addService(req, res) {
  try {
    const { title, description } = req.body;
    let imageUrl = null;
    console.log("req.files:", req.files);

    // Upload to Appwrite
    if (req.files?.image) {
      imageUrl = await uploadToAppwrite(req.files.image[0]);
    }

    const newService = new Services({ title, image: imageUrl, description });
    await newService.save();

    return res
      .status(201)
      .json({ message: "Service added successfully", newService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteService(req, res) {
  try {
    const service = await Services.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateService(req, res) {
  try {
    const { title, description } = req.body;
    let imageUrl;

    if (req.files?.image) {
      imageUrl = await uploadToAppwrite(req.files.image[0]);
    }

    const service = await Services.findByIdAndUpdate(
      req.params.id,
      { title, description, image: imageUrl },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
