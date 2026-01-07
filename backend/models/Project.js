import mongoose, { now } from "mongoose";

//1- Create a schema
//2- Create a model based of the schema

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    gitHubLink: {
      type: String,
      required: false,
    },
    vercelLink: {
      type: String,
      required: false,
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    techStack: {
      type: [String],
      required: true,
    },
    isSpecial: {
      type: Boolean,
      required: true,
    },
    startedAt: {
      type: Date,
      required: true,
      default: now(),
    },
    endedAt: {
      type: Date,
      required: false,
      default: now(),
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
