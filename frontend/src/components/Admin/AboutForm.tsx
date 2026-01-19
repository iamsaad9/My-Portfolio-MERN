"use client";

import { useState, useEffect } from "react";
import { Upload, X, Loader2, Pencil, Trash2 } from "lucide-react";

interface AboutData {
  _id: string;
  bio: string;
  imageUrl: string;
  resumeUrl: string;
}

const AboutForm = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({ bio: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch existing about data
  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_DB_URL}/api/about`);

      if (response.ok) {
        const data = await response.json();
        // Assuming API returns { about: {...} } or an array
        const about = Array.isArray(data) ? data[0] : data.about || data;

        if (about) {
          setAboutData(about);
          setFormData({ bio: about.bio });
        }
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
      showMessage("error", "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleSubmit = async () => {
    if (!formData.bio) {
      console.error("error", "Bio is required");
      return;
    }

    // For new entry, require all files
    if (!aboutData && (!imageFile || !resumeFile)) {
      console.error("error", "Image and resume are required for new entry");
      return;
    }

    setSubmitting(true);

    const data = new FormData();
    data.append("bio", formData.bio);
    if (imageFile) data.append("image", imageFile);
    if (resumeFile) data.append("resume", resumeFile);

    try {
      const url = aboutData ? `/api/about/${aboutData._id}` : "/api/about";
      const method = aboutData ? "PUT" : "POST";

      console.log("Submitting to:", url, "with method:", method);
      console.log("Data:", data);

      const response = await fetch(`${import.meta.env.VITE_DB_URL}${url}`, {
        method,
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        showMessage("success", result.message || "Saved successfully!");

        // Refresh data
        await fetchAboutData();

        // Reset files and editing state
        setImageFile(null);
        setResumeFile(null);
        setIsEditing(false);
      } else {
        const error = await response.json();
        showMessage("error", error.message || "Failed to save");
      }
    } catch (error) {
      showMessage("error", "Error: " + (error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!aboutData) return;

    if (!confirm("Are you sure you want to delete this about section?")) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/api/about/${aboutData._id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        showMessage("success", "Deleted successfully!");
        setAboutData(null);
        setFormData({ bio: "" });
        setIsEditing(false);
      } else {
        showMessage("error", "Failed to delete");
      }
    } catch (error) {
      showMessage("error", "Error: " + (error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (aboutData) {
      setFormData({ bio: aboutData.bio });
    } else {
      setFormData({ bio: "" });
    }
    setImageFile(null);
    setResumeFile(null);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-purple-500" size={40} />
      </div>
    );
  }

  return (
    <div className=" w-full mx-auto py-6 space-y-6">
      {/* Message Alert */}
      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Existing Data Display */}
      {aboutData && !isEditing && (
        <div className="bg-(--bg-secondary) rounded-2xl p-8 text-white space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-semibold">Current About Section</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-[10px] transition-colors cursor-pointer"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={handleDelete}
                disabled={submitting}
                className="p-2 bg-red-500/50 hover:bg-red-500/70 rounded-[10px] transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm opacity-80">Bio:</label>
              <p className="text-lg mt-1">{aboutData.bio}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm opacity-80">Profile Image:</label>
                <img
                  src={aboutData.imageUrl}
                  alt="Profile"
                  className="mt-2 rounded-lg h-48 w-48 object-cover"
                />
              </div>
              <div>
                <label className="text-sm opacity-80">Resume:</label>
                <a
                  href={aboutData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block p-4 bg-white/20 hover:bg-white/30 rounded-[10px] transition-colors text-center font-semibold"
                >
                  View Resume PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form (for create or edit) */}
      {(!aboutData || isEditing) && (
        <div className="bg-(--bg-secondary) rounded-2xl shadow-lg p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {aboutData ? "Edit About Section" : "Create About Section"}
            </h2>
            {isEditing && (
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-(--bg-primary)/70 hover:bg-(--bg-primary)/50 transition-colors duration-200 rounded-[10px] cursor-pointer text-white hover:text-white/80"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Bio Field */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Bio *
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 bg-(--bg-primary)/30 rounded-[10px]  "
              placeholder="Enter your bio..."
            />
          </div>

          {/* Image Upload */}
          <FileUpload
            label={`Profile Image ${aboutData && !imageFile ? "(current image will be kept if not changed)" : "*"}`}
            file={imageFile}
            setFile={setImageFile}
            accept="image/*"
            currentUrl={aboutData?.imageUrl}
          />

          {/* Resume Upload */}
          <FileUpload
            label={`Resume PDF ${aboutData && !resumeFile ? "(current resume will be kept if not changed)" : "*"}`}
            file={resumeFile}
            setFile={setResumeFile}
            accept=".pdf"
            currentUrl={aboutData?.resumeUrl}
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-gradient-to-r from-(--theme_1) to-(--theme_2) text-white py-3 rounded-[10px] font-medium hover:from-(--theme_1)/80 hover:to-(--theme_2)/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                {aboutData ? "Updating..." : "Creating..."}
              </>
            ) : aboutData ? (
              "Update"
            ) : (
              "Create"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

// File Upload Component
const FileUpload = ({
  label,
  file,
  setFile,
  accept,
  currentUrl,
}: {
  label: string;
  file: File | null;
  setFile: (file: File | null) => void;
  accept: string;
  currentUrl?: string;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-white mb-2">
        {label}
      </label>

      {/* Current file preview */}
      {currentUrl && !file && (
        <div className="mb-2 p-3 bg-(--bg-secondary) rounded-lg">
          <p className="text-sm text-white">Current file:</p>
          {accept.includes("image") ? (
            <img
              src={currentUrl}
              alt="Current"
              className="mt-2 rounded w-32 h-32 object-cover"
            />
          ) : (
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-(--theme_1) hover:underline"
            >
              View current file
            </a>
          )}
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-(--theme_1) transition-colors">
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
              <span className="text-sm text-white">{file.name}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setFile(null);
                }}
                className="text-red-600 hover:text-red-800"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div>
              <Upload className="mx-auto mb-2 text-gray-400" size={40} />
              <p className="text-sm text-white/70">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-white/50 mt-1">
                {accept.includes("image") ? "Images only" : "PDF only"}
              </p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default AboutForm;
