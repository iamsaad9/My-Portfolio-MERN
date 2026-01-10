import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import TypingText from "../ui/shadcn-io/typing-text";
import { RxAvatar } from "react-icons/rx";
import { Input } from "../ui/input";
import { BackgroundBeams } from "../ui/background-beams";
import { AuthContext } from "@/context/AuthContext";
import useModalStore from "@/context/store/useModalStore";

const TestimonialForm = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const [formData, setFormData] = useState({
    name: user?.name || "",
    designation: "",
    testimonial: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isModalOpen, closeModal } = useModalStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

    try {
      await axios.post("http://localhost:3000/api/testimonials/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Testimonial submitted!");
      closeModal();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="relative rounded-[20px] overflow-hidden border border-white/10">
        <BackgroundBeams />
        <motion.form
          onSubmit={handleSubmit}
          className="flex relative flex-col p-8 bg-transparent gap-5  overflow-hidden w-[520px]  font-sans shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-2">
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
              className="text-3xl"
            />
          </div>

          {/* User Info Display */}
          <div className="flex items-center gap-3 p-3 rounded-lg ">
            {user?.avatar != null ? (
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-(--theme_1)"
              />
            ) : (
              <RxAvatar className="w-10 h-10 rounded-full object-cover " />
            )}

            <div className="flex-1 flex flex-col">
              <p className="text-white text-lg">{user?.name}</p>
              <p className="text-white/60 text-xs">{user?.email}</p>
            </div>
          </div>

          {/* Name Field */}
          <div className="flex flex-col gap-2">
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
              className="p-3 border border-white  bg-(--bg-secondary) rounded-[0.5rem] text-white w-full"
            />
          </div>

          {/* Designation Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="designation"
              className="text-white/80 text-sm font-medium"
            >
              Designation / Title
            </label>

            <Input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="e.g., CEO at Company, Student, etc."
              className="p-3 border border-white  bg-(--bg-secondary) rounded-[0.5rem] text-white w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white/70 text-sm">
              Update Profile Picture (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-white text-sm"
            />
          </div>

          {/* Testimonial Field */}
          <div className="flex flex-col gap-2">
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
              className="p-3  h-20 p-4   resize-none whitespace-pre-line  bg-(--bg-secondary) rounded-[0.5rem] text-white max-w-full"
            />

            <p className="text-white/40 text-xs">
              {formData.testimonial.length} characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.testimonial}
            className="mt-5 bg-linear-to-r from-(--theme_1) to-(--theme_2) text-white text-[15px] font-medium rounded-[10px] p-2 w-full cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out content-center"
          >
            {isSubmitting ? "Submitting..." : "Submit Testimonial"}
          </button>

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
