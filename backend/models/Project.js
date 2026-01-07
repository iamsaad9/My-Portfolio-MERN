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
      required: false,
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
      required: true,
    },
    techStack: {
      type: [String],
      required: false,
    },
    isSpecial: {
      type: Boolean,
      required: false,
    },
    startedAt: {
      type: Date,
      required: false,
      default: now(),
    },
    endedAt: {
      type: Date,
      required: false,
      default: now(),
    },
  },
  { timestamps: false }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
