import Project from "../../models/Project.js";

export async function getAllProjects(req, res) {
  try {
    const project = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createProject(req, res) {
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

    const image = req.file?.path; // Cloudinary URL

    if (!req.file) {
      return res
        .status(400)
        .json({ error: "Image file is missing from the request" });
    }

    const newProject = new Project({
      title,
      description,
      image,
      gitHubLink,
      vercelLink,
      isSpecial,
      techStack,
      startedAt,
      endedAt,
    });

    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal Server Error" });
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

    // If new image uploaded, use Cloudinary URL
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
        techStack,
        startedAt,
        endedAt,
      },
      { new: true }
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
