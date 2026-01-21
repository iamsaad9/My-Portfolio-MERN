import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
  X,
  Upload,
  Loader2,
  Clock,
} from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  email: string;
  username: string;
  image?: string;
  designation?: string;
  testimonial: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

// interface EditFormData {
//   name: string;
//   email: string;
//   username: string;
//   designation: string;
//   testimonial: string;
//   status: "pending" | "approved" | "rejected";
// }

const TestimonialsTable: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [editModal, setEditModal] = useState<{
    open: boolean;
    testimonial: Testimonial | null;
  }>({
    open: false,
    testimonial: null,
  });
  const [viewModal, setViewModal] = useState<{
    open: boolean;
    testimonial: Testimonial | null;
  }>({
    open: false,
    testimonial: null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/api/testimonials`,
      );
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      const data = await response.json();
      setTestimonials(data.testimonials || data);
      setError("");
    } catch (err) {
      setError("Failed to load testimonials");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/api/testimonials/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );

      if (!response.ok) throw new Error("Failed to update status");

      await fetchTestimonials();
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DB_URL}/api/testimonials/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("Failed to delete testimonial");

      await fetchTestimonials();
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      setError("Failed to delete testimonial");
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditModal({ open: true, testimonial });
    setImageFile(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModal.testimonial) return;

    setUpdating(true);
    const formData = new FormData();
    const form = e.target as HTMLFormElement;

    formData.append(
      "name",
      (form.elements.namedItem("name") as HTMLInputElement).value,
    );
    formData.append(
      "email",
      (form.elements.namedItem("email") as HTMLInputElement).value,
    );
    formData.append(
      "username",
      (form.elements.namedItem("username") as HTMLInputElement).value,
    );
    formData.append(
      "designation",
      (form.elements.namedItem("designation") as HTMLInputElement).value,
    );
    formData.append(
      "testimonial",
      (form.elements.namedItem("testimonial") as HTMLTextAreaElement).value,
    );
    formData.append(
      "status",
      (form.elements.namedItem("status") as HTMLSelectElement).value,
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(
        `/api/testimonials/${editModal.testimonial._id}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      if (!response.ok) throw new Error("Failed to update testimonial");

      setEditModal({ open: false, testimonial: null });
      setImageFile(null);
      await fetchTestimonials();
    } catch (err) {
      console.error("Error updating testimonial:", err);
      setError("Failed to update testimonial");
    } finally {
      setUpdating(false);
    }
  };

  const filteredTestimonials = testimonials.filter((t) =>
    filter === "all" ? true : t.status === filter,
  );

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      approved: "bg-green-500/20 text-green-300 border-green-500/30",
      rejected: "bg-red-500/20 text-red-300 border-red-500/30",
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock size={14} />,
      approved: <CheckCircle size={14} />,
      rejected: <XCircle size={14} />,
    };
    return icons[status as keyof typeof icons];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-(--bg-secondary) rounded-2xl">
        <Loader2 className="animate-spin text-[#3b82f6]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--bg-secondary) rounded-2xl p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Testimonials Management
          </h1>
          <p className="text-gray-400">
            Manage and review customer testimonials
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300">
            {error}
          </div>
        )}

        <div className="mb-6 flex gap-3">
          {(["all", "pending", "approved", "rejected"] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-[10px] font-medium transition-all duration-200 cursor-pointer ${
                  filter === status
                    ? "bg-linear-to-r from-[#3b82f6] to-[#a855f7] text-white shadow-lg"
                    : "bg-[#333] text-gray-300 hover:bg-[#444]"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-2 text-xs opacity-75">
                  (
                  {
                    testimonials.filter(
                      (t) => status === "all" || t.status === status,
                    ).length
                  }
                  )
                </span>
              </button>
            ),
          )}
        </div>

        <div className="bg-(--bg-primary)/70  rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto ">
            <table className="w-full ">
              <thead className="bg-(--bg-primary) ">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Testimonial
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTestimonials.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-400"
                    >
                      No testimonials found
                    </td>
                  </tr>
                ) : (
                  filteredTestimonials.map((testimonial) => (
                    <tr
                      key={testimonial._id}
                      onClick={() => setViewModal({ open: true, testimonial })}
                      className="hover:bg-(--bg-primary)/40 transition-colors duration-200 cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {testimonial.image ? (
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-(--theme_1)"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-(--theme_1) to-(--theme_2) flex items-center justify-center text-white font-semibold">
                              {testimonial.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-white">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {testimonial.designation || "No designation"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300 line-clamp-2 max-w-md">
                          {testimonial.testimonial}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(testimonial.status)}`}
                        >
                          {getStatusIcon(testimonial.status)}
                          {testimonial.status.charAt(0).toUpperCase() +
                            testimonial.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {testimonial.status !== "approved" && (
                            <button
                              onClick={() =>
                                updateStatus(testimonial._id, "approved")
                              }
                              className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-[10px] transition-all cursor-pointer"
                              title="Approve"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}
                          {testimonial.status !== "rejected" && (
                            <button
                              onClick={() =>
                                updateStatus(testimonial._id, "rejected")
                              }
                              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-[10px] transition-all cursor-pointer"
                              title="Reject"
                            >
                              <XCircle size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => handleEdit(testimonial)}
                            className="p-2 text-gray-400 hover:text-[#a855f7] hover:bg-[#a855f7]/10 rounded-[10px] transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial._id)}
                            className="p-2 text-gray-400 hover:text-[#ec4899] hover:bg-[#ec4899]/10 rounded-[10px] transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewModal.open && viewModal.testimonial && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#333] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#3b82f6] to-[#a855f7] p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Testimonial Details
              </h2>
              <button
                onClick={() => setViewModal({ open: false, testimonial: null })}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                {viewModal.testimonial.image ? (
                  <img
                    src={viewModal.testimonial.image}
                    alt={viewModal.testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-[#3b82f6]"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#a855f7] flex items-center justify-center text-white text-3xl font-bold">
                    {viewModal.testimonial.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {viewModal.testimonial.name}
                  </h3>
                  <p className="text-gray-400">
                    {viewModal.testimonial.designation || "No designation"}
                  </p>
                  <p className="text-sm text-gray-500">
                    @{viewModal.testimonial.username}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Email
                  </label>
                  <p className="text-white">{viewModal.testimonial.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(viewModal.testimonial.status)}`}
                  >
                    {getStatusIcon(viewModal.testimonial.status)}
                    {viewModal.testimonial.status.charAt(0).toUpperCase() +
                      viewModal.testimonial.status.slice(1)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Testimonial
                </label>
                <p className="text-white bg-[#1a1a1a] p-4 rounded-lg leading-relaxed">
                  {viewModal.testimonial.testimonial}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Created
                  </label>
                  <p className="text-gray-300">
                    {new Date(viewModal.testimonial.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Updated
                  </label>
                  <p className="text-gray-300">
                    {new Date(viewModal.testimonial.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal.open && editModal.testimonial && (
        <div className="fixed inset-0  backdrop-blur-2xl flex items-center justify-center p-4 z-50 ">
          <div className="bg-[#333] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-[#a855f7] to-[#ec4899] p-6 flex justify-between items-center ">
              <h2 className="text-2xl font-bold text-white">
                Edit Testimonial
              </h2>
              <button
                onClick={() => {
                  setEditModal({ open: false, testimonial: null });
                  setImageFile(null);
                }}
                className="text-white hover:bg-white/20 p-2 rounded-[10px] cursor-pointer transition-all"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6" onSubmit={handleUpdate}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editModal.testimonial.name}
                      className="w-full px-4 py-2 bg-(--bg-primary)/50 rounded-[10px] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={editModal.testimonial.email}
                      className="w-full px-4 py-2 bg-(--bg-primary)/50 rounded-[10px] text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username *
                    </label>
                    <input
                      type="text"
                      name="username"
                      defaultValue={editModal.testimonial.username}
                      className="w-full px-4 py-2 bg-(--bg-primary)/50 rounded-[10px] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      defaultValue={editModal.testimonial.designation || ""}
                      className="w-full px-4 py-2 bg-(--bg-primary)/50 rounded-[10px] text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Testimonial *
                  </label>
                  <textarea
                    name="testimonial"
                    rows={4}
                    defaultValue={editModal.testimonial.testimonial}
                    className="w-full px-4 py-2 bg-(--bg-primary)/50 rounded-[10px] text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={editModal.testimonial.status}
                    className="w-full px-4 py-2 bg-(--bg-primary)/50 rounded-[10px] text-white"
                  >
                    <option value="pending" className="bg-(--bg-primary)/50">
                      Pending
                    </option>
                    <option value="approved" className="bg-(--bg-primary)/50">
                      Approved
                    </option>
                    <option value="rejected" className="bg-(--bg-primary)/50">
                      Rejected
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Profile Image
                  </label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#a855f7] transition-all">
                    <input
                      type="file"
                      onChange={(e) =>
                        setImageFile(e.target.files?.[0] || null)
                      }
                      accept="image/*"
                      className="hidden"
                      id="edit-image"
                    />
                    <label htmlFor="edit-image" className="cursor-pointer">
                      {imageFile ? (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">
                            {imageFile.name}
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setImageFile(null);
                            }}
                            className="text-[#ec4899] hover:text-[#ec4899]/80"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload
                            className="mx-auto mb-2 text-gray-500"
                            size={40}
                          />
                          <p className="text-sm text-gray-400">
                            Click to upload new image
                          </p>
                          {editModal.testimonial.image && (
                            <p className="text-xs text-gray-500 mt-1">
                              Current image will be kept if not changed
                            </p>
                          )}
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdate(e);
                    }}
                    disabled={updating}
                    className="flex-1 bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-[#ec4899]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                  >
                    {updating ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Updating...
                      </>
                    ) : (
                      "Update Testimonial"
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditModal({ open: false, testimonial: null });
                      setImageFile(null);
                    }}
                    className="px-6 py-3 bg-[#1a1a1a] text-gray-300 rounded-lg font-medium hover:bg-[#2a2a2a] transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsTable;
