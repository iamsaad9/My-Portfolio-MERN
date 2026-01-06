import Skill from "../../models/Skill.js";

export async function getAllSkills(req, res) {
  try {
    const skills = await Skill.find().sort({ createdAt: 1 });
    return res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addSkill(req, res) {
  try {
    const { title, logo, description } = req.body;
    const newSkill = new Skill({ title, logo, description });
    await newSkill.save();
    return res
      .status(201)
      .json({ message: "Skill added successfully: ", newSkill });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteSkill(req, res) {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    return res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateSkill(req, res) {
  try {
    const { title, logo, description } = req.body;
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { title, logo, description },
      { new: true }
    );
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    return res.status(200).json({ message: "Skill updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
