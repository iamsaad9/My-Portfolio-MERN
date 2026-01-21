import React, { useState, useEffect } from "react";
import { Upload, X, Loader2, Edit2, Trash2, Plus, Save } from "lucide-react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CiIcons from "react-icons/ci";
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";
import * as RiIcons from "react-icons/ri";
import * as DiIcons from "react-icons/di";
import type { IconType } from "react-icons";

type IconPack = Record<string, IconType>;

// Types
interface Project {
  _id: string;
  title: string;
  description: string;
  gitHubLink: string;
  vercelLink: string;
  coverImage: string;
  images: string[];
  techStack: string[];
  isSpecial: boolean;
  startedAt: string;
  endedAt: string;
}

interface FormData {
  title: string;
  description: string;
  gitHubLink: string;
  vercelLink: string;
  isSpecial: boolean;
  techStack: string[];
  startedAt: string;
  endedAt: string;
}

const ProjectManagementForm = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/api/projects`,
      );
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        showMessage("error", "Failed to fetch projects");
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      showMessage("error", errMsg);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/api/projects/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        showMessage("success", "Project deleted successfully");
        fetchProjects();
      } else {
        showMessage("error", "Failed to delete project");
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      showMessage("error", "Error deleting project: " + errMsg);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleFormSuccess = () => {
    fetchProjects();
    handleCloseForm();
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center rounded-2xl"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <Loader2
          className="animate-spin"
          size={48}
          style={{ color: "var(--theme_1)" }}
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8 rounded-2xl"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <style>{`
        :root {
          --bg-primary: #121212;
          --bg-secondary: #333;
          --theme_1: #3b82f6;
          --theme_2: #a855f7;
          --theme_3: #ec4899;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-white">
            Project Management
          </h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-[10px] cursor-pointer font-medium text-white transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, var(--theme_1), var(--theme_2))`,
            }}
          >
            <Plus size={16} />
            Add Project
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-[10px] ${
              message.type === "success"
                ? "bg-green-900/50 text-green-200"
                : "bg-red-900/50 text-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {isFormOpen && (
          <ProjectForm
            project={editingProject}
            onClose={handleCloseForm}
            onSuccess={handleFormSuccess}
            showMessage={showMessage}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">
              No projects yet. Create your first one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
}) => {
  const iconPacks: Record<
    "Fa" | "Ai" | "Ci" | "Si" | "Tb" | "Ri" | "Di",
    IconPack
  > = {
    Fa: FaIcons,
    Ai: AiIcons,
    Ci: CiIcons,
    Si: SiIcons,
    Tb: TbIcons,
    Ri: RiIcons,
    Di: DiIcons,
  };

  const DynamicIcon = ({ iconName }: { iconName: string; size?: number }) => {
    const prefix = iconName.slice(0, 2) as keyof typeof iconPacks;
    const pack = iconPacks[prefix];

    if (!pack) return null;

    const Icon = pack[iconName];
    return Icon ? <Icon className="size-4" /> : null;
  };

  return (
    <div
      className="rounded-[10px] cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.coverImage || "/placeholder.jpg"}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {project.isSpecial && (
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, var(--theme_1), var(--theme_2))`,
            }}
          >
            Special
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, index) => (
            <DynamicIcon iconName={tech} key={index} />
          ))}
        </div>

        <div className="flex gap-2 ">
          <button
            onClick={() => onEdit(project)}
            className="flex items-center justify-center gap-2  px-4 py-1 rounded-[10px] font-medium text-white transition-all duration-300 hover:opacity-80 cursor-pointer"
            style={{ backgroundColor: "var(--theme_1)" }}
          >
            <Edit2 size={16} />
            Edit
          </button>
          <button
            onClick={() => onDelete(project._id)}
            className="flex items-center justify-center gap-2 px-4 py-1 rounded-[10px] font-medium text-white transition-all duration-300 hover:opacity-80 cursor-pointer"
            style={{ backgroundColor: "var(--theme_2)" }}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProjectFormProps {
  project: Project | null;
  onClose: () => void;
  onSuccess: () => void;
  showMessage: (type: "success" | "error", text: string) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onClose,
  onSuccess,
  showMessage,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: project?.title || "",
    description: project?.description || "",
    gitHubLink: project?.gitHubLink || "",
    vercelLink: project?.vercelLink || "",
    isSpecial: project?.isSpecial || false,
    techStack: project?.techStack || [],
    startedAt: project?.startedAt
      ? new Date(project.startedAt).toISOString().split("T")[0]
      : "",
    endedAt: project?.endedAt
      ? new Date(project.endedAt).toISOString().split("T")[0]
      : "",
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [projectImages, setProjectImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!formData.title) {
      showMessage("error", "Title is required");
      return;
    }

    if (!project && !coverImage) {
      showMessage("error", "Cover image is required for new projects");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("gitHubLink", formData.gitHubLink);
    data.append("vercelLink", formData.vercelLink);
    data.append("isSpecial", String(formData.isSpecial));
    data.append("techStack", JSON.stringify(formData.techStack));
    data.append("startedAt", formData.startedAt);
    data.append("endedAt", formData.endedAt);

    if (coverImage) {
      data.append("coverImage", coverImage);
    }

    projectImages.forEach((img) => {
      data.append("images", img);
    });

    try {
      const url = project ? `/api/projects/${project._id}` : "/api/projects";
      const method = project ? "PUT" : "POST";

      const response = await fetch(`${import.meta.env.VITE_DB_URL}${url}`, {
        method,
        body: data,
      });

      if (response.ok) {
        showMessage(
          "success",
          `Project ${project ? "updated" : "created"} successfully!`,
        );
        onSuccess();
      } else {
        const error = await response.json();
        showMessage(
          "error",
          error.message || `Failed to ${project ? "update" : "create"} project`,
        );
      }
    } catch (error) {
      showMessage("error", "Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex bg-transparent backdrop-blur-2xl  items-center justify-center p-4 z-50 ">
      <div
        className="rounded-2xl w-full max-w-3xl my-8 max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div
          className="sticky top-0 z-10 p-6 border-b border-gray-700 flex justify-between items-center "
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <h2 className="text-2xl font-bold text-white">
            {project ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 rounded-[10px] border-2 border-transparent bg-(--bg-primary)/50 focus:border-blue-500 transition-colors text-white"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tech Stack (comma-separated)
              </label>
              <input
                type="text"
                value={formData.techStack.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    techStack: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                className="w-full px-4 py-3 rounded-[10px] border-2 border-transparent focus:border-blue-500 transition-colors text-white bg-(--bg-primary)/50"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 rounded-[10px] border-2 border-transparent focus:border-blue-500 transition-colors text-white bg-(--bg-primary)/50"
              placeholder="Describe your project..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub Link
              </label>
              <input
                type="url"
                value={formData.gitHubLink}
                onChange={(e) =>
                  setFormData({ ...formData, gitHubLink: e.target.value })
                }
                className="w-full px-4 py-3 rounded-[10px] border-2 border-transparent focus:border-blue-500 transition-colors text-white bg-(--bg-primary)/50"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Vercel Link
              </label>
              <input
                type="url"
                value={formData.vercelLink}
                onChange={(e) =>
                  setFormData({ ...formData, vercelLink: e.target.value })
                }
                className="w-full px-4 py-3 rounded-[10px] border-2 border-transparent focus:border-blue-500 transition-colors text-white bg-(--bg-primary)/50"
                placeholder="https://vercel.app/..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startedAt}
                onChange={(e) =>
                  setFormData({ ...formData, startedAt: e.target.value })
                }
                className="w-full px-4 py-3 rounded-[10px] border-2 border-transparent focus:border-blue-500 transition-colors text-white bg-(--bg-primary)/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={formData.endedAt}
                onChange={(e) =>
                  setFormData({ ...formData, endedAt: e.target.value })
                }
                className="w-full px-4 py-3 rounded-[10px] border-2 border-transparent focus:border-blue-500 transition-colors text-white bg-(--bg-primary)/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-[10px] bg-(--bg-primary)/50">
            <input
              type="checkbox"
              checked={formData.isSpecial}
              onChange={(e) =>
                setFormData({ ...formData, isSpecial: e.target.checked })
              }
              className="w-5 h-5 rounded"
              style={{ accentColor: "var(--theme_1)" }}
            />
            <label className="text-sm font-medium text-gray-300">
              Mark as Special Project
            </label>
          </div>

          <FileUpload
            label={`Cover Image ${project ? "" : "*"}`}
            file={coverImage}
            setFile={setCoverImage}
            accept="image/*"
            currentImage={project?.coverImage}
          />

          <MultiFileUpload
            label="Project Images"
            files={projectImages}
            setFiles={setProjectImages}
            accept="image/*"
            currentImages={project?.images || []}
          />

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] font-medium text-white transition-all duration-300 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              style={{
                background: `linear-gradient(135deg, var(--theme_1), var(--theme_2))`,
              }}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Save size={20} />
              )}
              {loading
                ? "Saving..."
                : project
                  ? "Update Project"
                  : "Create Project"}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 rounded-[10px] font-medium bg-(--bg-primary)/50 text-white transition-all duration-300 hover:opacity-80 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FileUploadProps {
  label: string;
  file: File | null;
  setFile: (file: File | null) => void;
  accept: string;
  currentImage?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  file,
  setFile,
  accept,
  currentImage,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div
        className="border-2 border-dashed rounded-[10px] p-6 text-center transition-all duration-300 hover:border-blue-500"
        style={{ borderColor: "var(--theme_1)" }}
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          accept={accept}
          className="hidden"
          id={`file-${label}`}
        />
        <label htmlFor={`file-${label}`} className="cursor-pointer">
          {file ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">{file.name}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setFile(null);
                }}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ) : currentImage ? (
            <div className="space-y-2">
              <img
                src={currentImage}
                alt="Current"
                className="w-32 h-32 object-cover mx-auto rounded-[10px]"
              />
              <p className="text-sm text-gray-400">Click to change image</p>
            </div>
          ) : (
            <div>
              <Upload
                className="mx-auto mb-2"
                size={40}
                style={{ color: "var(--theme_1)" }}
              />
              <p className="text-sm text-gray-300">
                Click to upload or drag and drop
              </p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

interface MultiFileUploadProps {
  label: string;
  files: File[];
  setFiles: (files: File[]) => void;
  accept: string;
  currentImages?: string[];
}

const MultiFileUpload: React.FC<MultiFileUploadProps> = ({
  label,
  files,
  setFiles,
  accept,
  currentImages,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>

      {currentImages && currentImages.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2">Current Images:</p>
          <div className="grid grid-cols-4 gap-2">
            {currentImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Current ${index}`}
                className="w-full h-24 object-cover rounded-[10px]"
              />
            ))}
          </div>
        </div>
      )}

      <div
        className="border-2 border-dashed rounded-[10px] p-6 text-center transition-all duration-300 hover:border-blue-500"
        style={{ borderColor: "var(--theme_1)" }}
      >
        <input
          type="file"
          onChange={handleFileChange}
          accept={accept}
          multiple
          className="hidden"
          id={`multi-file-${label}`}
        />
        <label htmlFor={`multi-file-${label}`} className="cursor-pointer">
          <Upload
            className="mx-auto mb-2"
            size={40}
            style={{ color: "var(--theme_1)" }}
          />
          <p className="text-sm text-gray-300">
            Click to upload multiple files
          </p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-[10px]"
              style={{ backgroundColor: "var(--bg-primary)" }}
            >
              <span className="text-sm text-gray-300">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectManagementForm;
