import About from "../../models/About.js";
import { uploadToAppwrite } from "../utils/appwriteUpload.js";

export async function getAbout(req, res) {
  try {
    const about = await About.findOne();
    return res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addAbout(req, res) {
  try {
    const { bio } = req.body;

    let imageUrl = null;
    let resumeUrl = null;

    if (req.files?.image) {
      imageUrl = await uploadToAppwrite(req.files.image[0]);
    }

    if (req.files?.resume) {
      resumeUrl = await uploadToAppwrite(req.files.resume[0]);
    }

    const newAbout = new About({
      bio,
      imageUrl,
      resumeUrl,
    });

    await newAbout.save();

    res.status(201).json({
      message: "About added successfully",
      about: newAbout,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateAbout(req, res) {
  try {
    const { bio } = req.body;

    const updateData = { bio };

    if (req.files?.image) {
      updateData.imageUrl = await uploadToAppwrite(req.files.image[0]);
    }

    if (req.files?.resume) {
      updateData.resumeUrl = await uploadToAppwrite(req.files.resume[0]);
    }

    const about = await About.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!about) {
      return res.status(404).json({ message: "About not found" });
    }

    res.status(200).json({ about });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
