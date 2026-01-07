import Testimonial from "../../models/Testimonial.js";
import { uploadToAppwrite } from "../utils/appwriteUpload.js";

export async function getAllTestimonials(req, res) {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addTestimonial(req, res) {
  try {
    const { name, testimonial, designation } = req.body;
    let imageUrl = null;
    if (req.files?.image) {
      imageUrl = await uploadToAppwrite(req.files.image[0]);
    }
    const newTestimonial = new Testimonial({
      name,
      testimonial,
      designation,
      image: imageUrl,
    });
    await newTestimonial.save();
    return res
      .status(201)
      .json({ message: "Testimonial added successfully: ", newTestimonial });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteTestimonial(req, res) {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    return res
      .status(200)
      .json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateTestimonial(req, res) {
  try {
    const { name, testimonial, designation } = req.body;

    const updateData = { name, testimonial, designation };

    if (req.files?.image) {
      updateData.imageUrl = await uploadToAppwrite(req.files.image[0]);
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    return res.status(200).json({
      message: "Testimonial updated successfully",
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    console.error("Update Testimonial Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
