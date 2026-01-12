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

export async function getTestimonialById(req, res) {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    return res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addTestimonial(req, res) {
  try {
    const { name, testimonial, designation, username, email } = req.body;

    let imageUrl = "";

    if (req.files?.image) {
      imageUrl = await uploadToAppwrite(req.files.image[0]);
    }

    const newTestimonial = new Testimonial({
      name,
      testimonial,
      designation,
      image: imageUrl,
      username,
      email,
    });

    await newTestimonial.save();
    return res
      .status(201)
      .json({ message: "Testimonial added successfully", newTestimonial });
  } catch (error) {
    console.error(error);
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
    const { name, testimonial, designation, username, email, status } =
      req.body;

    const updateData = {
      name,
      testimonial,
      designation,
      username,
      email,
      status,
    };

    if (req.files?.image) {
      updateData.image = await uploadToAppwrite(req.files.image[0]);
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true } // Added runValidators for safety
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
