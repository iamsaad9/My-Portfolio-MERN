import Project from "../../models/Project.js";
import { uploadToAppwrite } from "../utils/appwriteUpload.js";

const parseTechStack = (input) => {
  if (Array.isArray(input)) {
    // handle case where array contains a single JSON-stringified array
    if (
      input.length === 1 &&
      typeof input[0] === "string" &&
      input[0].trim().startsWith("[")
    ) {
      try {
        const parsed = JSON.parse(input[0]);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch (e) {
        // fallthrough to return array
      }
    }
    return input.map(String);
  }
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch (e) {}
    return input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

export async function getAllProjects(req, res) {
  try {
    const project = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addProject(req, res) {
  try {
    const {
      title,
      description,
      gitHubLink,
      vercelLink,
      isSpecial,
      techStack,
      startedAt,
      endedAt,
    } = req.body;

    // 1. Check if coverImage exists (Multer fields puts it in req.files.coverImage)
    if (!req.files || !req.files.coverImage) {
      return res.status(400).json({ error: "Cover image is required" });
    }

    // 2. Upload Cover Image (Single)
    // We pass req.files.coverImage[0] to get the single file object
    const coverImageUrl = await uploadToAppwrite(req.files.coverImage[0]);

    // 3. Upload Project Images (Multiple)
    let projectImagesUrls = [];
    if (req.files.images && req.files.images.length > 0) {
      // Pass the whole array to our updated function
      projectImagesUrls = await uploadToAppwrite(req.files.images);
    }

    // 4. Save to Database
    const newProject = new Project({
      title,
      description,
      coverImage: coverImageUrl, // Use the URL from Appwrite
      images: projectImagesUrls, // Use the Array of URLs
      gitHubLink,
      vercelLink,
      isSpecial: isSpecial === "true", // Multer sends strings; convert to boolean if needed
      techStack: parseTechStack(techStack),
      startedAt,
      endedAt,
    });

    await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
export async function deleteProject(req, res) {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    console.log("Deleted project:", deletedProject);
    res.status(201).json({ message: "deleted a project" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateProject(req, res) {
  try {
    const {
      title,
      description,
      gitHubLink,
      vercelLink,
      techStack,
      isSpecial,
      startedAt,
      endedAt,
    } = req.body;

    const image = req.file?.path;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        image, // will update only if new image uploaded
        gitHubLink,
        vercelLink,
        isSpecial,
        techStack: parseTechStack(techStack),
        startedAt,
        endedAt,
      },
      { new: true },
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res
      .status(200)
      .json({ message: "Project updated successfully", updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
