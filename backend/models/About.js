import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    bio: { type: String, required: true },
    imageUrl: { type: String, required: true },
    resumeUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const About = mongoose.model("About", AboutSchema);
export default About;
