import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import TypingText from "../ui/shadcn-io/typing-text";
import { RxAvatar } from "react-icons/rx";
import { Input } from "../ui/input";
import { BackgroundBeams } from "../ui/background-beams";
import { AuthContext } from "@/context/AuthContext";
import useModalStore from "@/context/store/useModalStore";
import { FileUpload } from "../ui/file-upload";
import { X } from "lucide-react";
import { Spinner } from "../ui/Spinner";
import { addToast } from "@heroui/toast";
import { AnimatePresence } from "framer-motion";

const TestimonialForm = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const [formData, setFormData] = useState({
    name: user?.name || "",
    designation: "",
    testimonial: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    designation?: string;
    testimonial?: string;
    file?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isModalOpen, closeModal, isUpdate, _id } = useModalStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // clear field error while typing
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileUpload = (files: File | null) => {
    setSelectedFile(files);
    console.log("Files: ", files);
    // validate file
    if (!files) {
      setErrors((prev) => ({ ...prev, file: undefined }));
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(files.type)) {
      setErrors((prev) => ({
        ...prev,
        file: "Only JPG, PNG or WEBP images are allowed.",
      }));
      return;
    }

    if (files.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        file: "Image must be smaller than 2MB.",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    const name = formData.name?.trim() || "";
    const testimonial = formData.testimonial?.trim() || "";

    if (!name) newErrors.name = "Name is required.";
    else if (name.length < 2)
      newErrors.name = "Name must be at least 2 characters.";

    if (formData.designation && formData.designation.length > 100)
      newErrors.designation = "Designation must be 100 characters or less.";

    if (!testimonial) newErrors.testimonial = "Testimonial is required.";
    else if (testimonial.length < 10)
      newErrors.testimonial = "Testimonial must be at least 10 characters.";
    else if (testimonial.length > 500)
      newErrors.testimonial = "Testimonial must be 500 characters or less.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const closeModalAndReset = () => {
    closeModal();
    setFormData({
      name: "",
      designation: "",
      testimonial: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // validate before submitting
    if (!validateForm()) return;
    setIsSubmitting(true);

    // Create FormData for multipart submission
    const data = new FormData();
    data.append("name", formData.name);
    data.append("designation", formData.designation);
    data.append("testimonial", formData.testimonial);
    data.append("username", user?.name || "");
    data.append("email", user?.email || "");

    if (selectedFile) {
      // Priority 1: User uploaded a new file
      data.append("image", selectedFile);
    } else {
      // Priority 2 & 3: Use avatar or empty string
      data.append("fallbackImage", user?.avatar || "");
    }

    console.log("Submitting Testimonial:", Object.fromEntries(data.entries()));
    try {
      if (isUpdate && _id) {
        await axios.put(
          `${import.meta.env.VITE_DB_URL}/api/testimonials/${_id}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        addToast({
          title: "Testimonial Updated",
          color: "success",
          variant: "bordered",
        });
      } else {
        await axios.post(
          `${import.meta.env.VITE_DB_URL}/api/testimonials/`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        addToast({
          title: "Testimonial Submitted",
          color: "success",
          variant: "bordered",
        });
      }
      setFormData({
        name: "",
        designation: "",
        testimonial: "",
      });
      closeModal();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to submit testimonial");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_DB_URL}/api/testimonials/${_id}`,
      );
      addToast({
        title: "Testimonial Deleted",
        color: "success",
        variant: "bordered",
      });
      closeModal();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to submit testimonial");
      } else {
        alert("Something went wrong");
      }
    }
  };

  useEffect(() => {
    console.log(
      "Modal open state changed:",
      isModalOpen,
      " ",
      _id,
      " ",
      isUpdate,
    );
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isUpdate && _id) {
      console.log("Fetching testimonial for update, ID:", _id);
      const fetchTestimonial = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_DB_URL}/api/testimonials/${_id}`,
          );
          const testimonial = response.data;
          setFormData({
            name: testimonial.name,
            designation: testimonial.designation,
            testimonial: testimonial.testimonial,
          });
        } catch (error) {
          console.error("Error fetching testimonial:", error);
        }
      };

      fetchTestimonial();
    }
  }, [isUpdate, _id]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
      }));
    }
  }, [user]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="relative rounded-[20px] overflow-hidden border border-white/10 w-[90%] sm:w-[70%] md:w-[520px] ">
        {showAlert && (
          <AnimatePresence>
            <motion.div
              className="fixed px-5 inset-0 z-50 flex items-center justify-center bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-md rounded-2xl bg-(--bg-secondary) p-6 shadow-xl"
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Header */}
                <h2 className="text-base">
                  Are you sure you want to delete your testimonial?
                </h2>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setShowAlert(false)}
                    className="rounded-[10px] border px-4 py-2 text-sm bg-(--bg-secondary) hover:bg-(--bg-primary)/50 transition-colors duration-200 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleDelete}
                    className="rounded-[10px] bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 transition-colors duration-200 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
        <BackgroundBeams />
        <motion.form
          onSubmit={handleSubmit}
          className="flex relative flex-col p-5 sm:p-8 bg-transparent gap-3  overflow-hidden  font-sans shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeModalAndReset}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div>
            <TypingText
              text={[
                "Write Your Testimonial.",
                "I Appreciate Your Feedback.",
                "Your Words Mean a Lot to Me.",
                "Share Your Thoughts.",
              ]}
              cursorClassName="h-8"
              typingSpeed={90}
              pauseDuration={4000}
              showCursor={true}
              startOnVisible={true}
              textColors={["white"]}
              variableSpeed={{ min: 50, max: 120 }}
              className="text-xl md:text-3xl"
            />
          </div>

          {/* User Info Display */}
          <div className="flex items-center gap-3 py-2 rounded-lg ">
            {user?.avatar != null ? (
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-(--theme_1)"
              />
            ) : (
              <RxAvatar className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover " />
            )}

            <div className="flex-1 flex flex-col">
              <p className="text-white text-sm sm:text-base md:text-base">
                {user?.name}
              </p>
              <p className="text-white/60 text-xs">{user?.email}</p>
            </div>
          </div>

          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-white/80 text-sm font-medium">
              Name <span className="text-red-400">*</span>
            </label>

            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`p-3 border  bg-(--bg-secondary) rounded-[0.5rem] text-white w-full ${
                errors.name ? "border-red-400" : "border-white"
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Designation Field */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="designation"
              className="text-white/80 text-sm font-medium"
            >
              Designation / Title (Optional)
            </label>

            <Input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="e.g., CEO at Company, Student, etc."
              className={`p-3 border  bg-(--bg-secondary) rounded-[0.5rem] text-white w-full ${
                errors.designation ? "border-red-400" : "border-white"
              }`}
            />
            {errors.designation && (
              <p className="text-red-400 text-xs">{errors.designation}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 md:gap-1">
            <label className="text-white/80 text-sm">
              Display Picture (Optional)
            </label>

            <FileUpload onChange={handleFileUpload} />
            {errors.file && (
              <p className="text-red-400 text-xs">{errors.file}</p>
            )}
          </div>

          {/* Testimonial Field */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="testimonial"
              className="text-white/80 text-sm font-medium"
            >
              Your Testimonial <span className="text-red-400">*</span>
            </label>
            <Input
              id="testimonial"
              type="textarea"
              name="testimonial"
              value={formData.testimonial}
              onChange={handleChange}
              placeholder="Share your feedback..."
              className="  h-20 md:h-16 p-4   resize-none whitespace-pre-line  bg-(--bg-secondary) rounded-[0.5rem] text-white max-w-full"
            />

            <p className="text-white/40 text-xs">
              {formData.testimonial.length} characters
            </p>
            {errors.testimonial && (
              <p className="text-red-400 text-xs">{errors.testimonial}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full flex gap-2 items-center justify-center">
            {isUpdate ? (
              <button
                type="button"
                onClick={() => setShowAlert(true)}
                className="mt-5 bg-red-800 text-xs sm:text-base text-white  font-medium rounded-[10px] p-2 cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out content-center"
              >
                Delete Testimonial
              </button>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 bg-linear-to-r from-(--theme_1) to-(--theme_2) text-white text-xs sm:text-base font-medium rounded-[10px] p-2 w-full cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out content-center"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner size={20} activeColor="white" />{" "}
                  {isUpdate ? "Updating..." : "Submitting..."}
                </div>
              ) : (
                <>{isUpdate ? "Update Testimonial" : "Submit Testimonial"}</>
              )}
            </button>
          </div>

          {/* Info Text */}
          <p className="text-white/40 text-xs text-center">
            Your testimonial will be reviewed before being published
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default TestimonialForm;
