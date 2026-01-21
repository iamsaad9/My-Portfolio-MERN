import React, { useState, useEffect } from "react";
import { Upload, X, Edit2, Trash2, Plus, Loader2, Save } from "lucide-react";

interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

interface FormData {
  title: string;
  description: string;
}

const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Fetch all services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/api/services`,
      );
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        showMessage("error", "Failed to fetch services");
      }
    } catch (error) {
      showMessage("error", "Error fetching services");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "" });
    setImageFile(null);
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.description || !imageFile) {
      showMessage("error", "Please fill all required fields");
      return;
    }

    setSubmitting(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", imageFile);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/api/services`,
        {
          method: "POST",
          body: data,
        },
      );

      if (response.ok) {
        showMessage("success", "Service added successfully!");
        await fetchServices();
        resetForm();
      } else {
        showMessage("error", "Failed to add service");
      }
    } catch (error) {
      showMessage("error", "Error adding service");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!formData.title || !formData.description) {
      showMessage("error", "Please fill all required fields");
      return;
    }

    if (!editingId) return;

    setSubmitting(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/api/services/${editingId}`,
        {
          method: "PUT",
          body: data,
        },
      );

      if (response.ok) {
        showMessage("success", "Service updated successfully!");
        await fetchServices();
        resetForm();
      } else {
        showMessage("error", "Failed to update service");
      }
    } catch (error) {
      showMessage("error", "Error updating service");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/api/services/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        showMessage("success", "Service deleted successfully!");
        await fetchServices();
      } else {
        showMessage("error", "Failed to delete service");
      }
    } catch (error) {
      showMessage("error", "Error deleting service");
      console.error(error);
    }
  };

  const startEdit = (service: Service) => {
    setFormData({
      title: service.title,
      description: service.description,
    });
    setEditingId(service._id);
    setShowAddForm(true);
    setImageFile(null);
  };

  const handleSubmit = () => {
    if (editingId) {
      handleUpdate();
    } else {
      handleAdd();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-(--bg-secondary) rounded-2xl">
        <Loader2 className="animate-spin text-[#3b82f6]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--bg-secondary) p-8 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Services Management</h1>
          <button
            onClick={() => {
              resetForm();
              setShowAddForm(!showAddForm);
            }}
            className="flex items-center gap-2 px-6 py-3 cursor-pointer bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white rounded-[10px] font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={20} />
            Add New Service
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-[10px] ${
              message.type === "success"
                ? "bg-green-900/50 text-green-200 border border-green-700"
                : "bg-red-900/50 text-red-200 border border-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {showAddForm && (
          <div className=" rounded-[10px] p-6 mb-8 border ">
            <h2 className="text-xl font-semibold text-white mb-6">
              {editingId ? "Edit Service" : "Add New Service"}
            </h2>

            <div className="space-y-6">
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
                  className="w-full px-4 py-3 bg-(--bg-primary)/50  rounded-[10px] text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                  placeholder="Enter service title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-(--bg-primary)/50  rounded-[10px] text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent resize-none"
                  placeholder="Enter service description"
                />
              </div>

              <FileUpload
                label={`Service Image ${editingId ? "" : "*"}`}
                file={imageFile}
                setFile={setImageFile}
                currentImage={
                  editingId
                    ? services.find((s) => s._id === editingId)?.image
                    : undefined
                }
              />

              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white rounded-[10px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Save size={20} />
                  )}
                  {submitting
                    ? "Saving..."
                    : editingId
                      ? "Update Service"
                      : "Add Service"}
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-(--bg-primary)/50 text-gray-300 rounded-[10px] font-medium hover:bg-(--bg-primary)/70 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">
                No services found. Add your first service!
              </p>
            </div>
          ) : (
            services.map((service) => (
              <div
                key={service._id}
                className="bg-(--bg-primary) cursor-pointer rounded-[10px] overflow-hidden border border-gray-700 hover:border-[#3b82f6] transition-colors group"
              >
                <div className="aspect-video bg-[#121212] overflow-hidden">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Upload className="text-gray-600" size={48} />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(service)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white rounded-[10px] text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ec4899] to-[#a855f7] text-white rounded-[10px] text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

interface FileUploadProps {
  label: string;
  file: File | null;
  setFile: (file: File | null) => void;
  currentImage?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  file,
  setFile,
  currentImage,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-600 rounded-[10px] p-6 text-center hover:border-[#3b82f6] transition-colors bg-(--bg-primary)/50 ">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          accept="image/*"
          className="hidden"
          id={`file-${label}`}
        />
        <label htmlFor={`file-${label}`} className="cursor-pointer">
          {file ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{file.name}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFile(null);
                  }}
                  className="text-[#ec4899] hover:text-[#a855f7] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              {file.type.startsWith("image/") && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="max-h-40 mx-auto rounded"
                />
              )}
            </div>
          ) : currentImage ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-400 mb-2">Current image:</p>
              <img
                src={currentImage}
                alt="Current"
                className="max-h-40 mx-auto rounded mb-2"
              />
              <p className="text-xs text-gray-500">
                Upload a new image to replace
              </p>
            </div>
          ) : (
            <div>
              <Upload className="mx-auto mb-2 text-[#3b82f6]" size={40} />
              <p className="text-sm text-gray-400">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default ServicesManager;
