import { useState, useEffect } from "react";
import { Loader2, Edit2, Trash2, Plus, Save } from "lucide-react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CiIcons from "react-icons/ci";
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";
import * as RiIcons from "react-icons/ri";
import * as DiIcons from "react-icons/di";
import type { IconType } from "react-icons";

type IconPack = Record<string, IconType>;

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
interface Skill {
  _id: string;
  title: string;
  description: string;
  logo: string;
  createdAt?: string;
}

const SkillsForm = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    logo: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch all skills on component mount
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_DB_URL}/api/skills`);
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
        console.log("Fetched skills:", data);
      } else {
        showMessage("error", "Failed to fetch skills");
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      showMessage("error", "Error fetching skills: " + errMsg);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", logo: "" });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.logo) {
      showMessage("error", "Please fill all required fields");
      return;
    }

    setSubmitting(true);

    try {
      const url = editingId ? `/api/skills/${editingId}` : "/api/skills";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(`${import.meta.env.VITE_DB_URL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showMessage(
          "success",
          `Skill ${editingId ? "updated" : "added"} successfully!`,
        );
        resetForm();
        fetchSkills();
      } else {
        showMessage("error", `Failed to ${editingId ? "update" : "add"} skill`);
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      showMessage("error", "Error: " + errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill._id);
    setFormData({
      title: skill.title,
      description: skill.description,
      logo: skill.logo,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/api/skills/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        showMessage("success", "Skill deleted successfully!");
        fetchSkills();
        if (editingId === id) {
          resetForm();
        }
      } else {
        showMessage("error", "Failed to delete skill");
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      showMessage("error", "Error deleting skill: " + errMsg);
    }
  };

  return (
    <div className="max-w-7xl bg-(--bg-secondary) rounded-2xl mx-auto p-5 md:p-8">
      <h1 className="text-2xl font-semibold mb-6">Skills Management</h1>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-[10px] ${message.type === "success" ? "bg-green-900/50 text-green-400 border border-green-600" : "bg-red-900 text-red-400 border border-red-600"}`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className=" rounded-lg p-3 sm:p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Skill" : "Add New Skill"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-[10px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., React.js"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-[10px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your proficiency..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Logo Icon *
                </label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-[10px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., FaReact, FaJavascript"
                />
                <p className="text-xs text-white/60 mt-1">
                  Enter icon name (e.g., FaJavascript, FaReact, FaNode)
                </p>
                <div className="w-full text-xs text-white/60 mt-2 flex flex-col gap-2">
                  <span>Available Icon Packs</span>
                  <ul>
                    {Object.keys(iconPacks).map((pack) => (
                      <li
                        key={pack}
                        className="inline mr-2 px-2 py-1 bg-(--bg-primary)/50 rounded-[10px] text-xs"
                      >
                        {pack}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 bg-linear-to-r from-(--theme_1) to-(--theme_2) cursor-pointer text-white py-2 rounded-[10px] font-medium hover:from-(--theme_1)/80 to-(--theme_2)/80 transition-colors duration-200isabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submitting ? (
                    <Loader2 className="animate-spin mr-2" size={20} />
                  ) : editingId ? (
                    <Save className="mr-2" size={20} />
                  ) : (
                    <Plus className="mr-2" size={20} />
                  )}
                  {submitting ? "Saving..." : editingId ? "Update" : "Add"}
                </button>

                {editingId && (
                  <button
                    onClick={resetForm}
                    className="px-4 border bg-(--bg-primary)/50 cursor-pointer rounded-[10px] font-medium hover:bg-(--bg-primary)/80 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills List Section */}
        <div className="lg:col-span-2">
          <div className="bg-(--bg-primary)/70 rounded-2xl p-5 ">
            <div className="p-6 ">
              <h2 className="text-xl font-semibold">
                All Skills ({skills.length})
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center p-12">
                <Loader2 className="animate-spin text-blue-600" size={40} />
              </div>
            ) : skills.length === 0 ? (
              <div className="text-center p-12 text-gray-500">
                <p className="text-lg">No skills found</p>
                <p className="text-sm mt-2">
                  Add your first skill to get started
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {skills.map((skill) => (
                  <SkillCard
                    key={skill._id}
                    skill={skill}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isEditing={editingId === skill._id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SkillCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
}

const SkillCard = ({ skill, onEdit, onDelete, isEditing }: SkillCardProps) => {
  return (
    <div
      className={`p-6  hover:bg-(--bg-primary)/80 border rounded-2xl cursor-pointer ${isEditing ? "bg-(--bg-primary)/70 border-l-4 border-blue-600" : ""}`}
    >
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className=" rounded-lg bg-gradient-to-br  flex items-center justify-center text-white">
            <DynamicIcon iconName={skill.logo} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1">
            {skill.title}
          </h3>
          <p className="text-white/60 text-sm line-clamp-2">
            {skill.description}
          </p>
          {skill.createdAt && (
            <p className="text-xs text-white/50 mt-2">
              Added: {new Date(skill.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex gap-2">
          <button
            onClick={() => onEdit(skill)}
            className="p-2 text-blue-600 hover:bg-black rounded-[10px] transition-colors duration-200 cursor-pointer"
            title="Edit skill"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(skill._id)}
            className="p-2 text-red-600 hover:bg-red-300 rounded-[10px] transition-colors duration-200 cursor-pointer"
            title="Delete skill"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const DynamicIcon = ({ iconName }: { iconName: string; size?: number }) => {
  const prefix = iconName.slice(0, 2) as keyof typeof iconPacks;
  const pack = iconPacks[prefix];

  if (!pack) return null;

  const Icon = pack[iconName];
  return Icon ? <Icon className="size-12 md:size-14 lg:size-16" /> : null;
};

export default SkillsForm;
