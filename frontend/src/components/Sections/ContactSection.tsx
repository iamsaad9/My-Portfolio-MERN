"use client";
import { useState } from "react";
import { z } from "zod";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { HeroHighlight } from "../ui/hero-highlight";
import AnimatedButton from "../ui/AnimatedButton";
import { HighlightText } from "../ui/shadcn-io/highlight-text";

// 1. Zod Schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear individual error
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<ContactFormData> = {};
      result.error.issues.forEach((err: z.ZodIssue) => {
        const fieldName = err.path[0] as keyof ContactFormData;
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      // Create a hidden form and submit it manually
      const formElement = document.createElement("form");
      formElement.method = "POST";
      formElement.action =
        "https://formsubmit.co/2e6b51614ffd4913b6fcc9216fb56abc";

      const formData = {
        ...form,
        _captcha: "false",
      };

      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        formElement.appendChild(input);
      });

      document.body.appendChild(formElement);
      formElement.submit();
    }
  };

  return (
    <motion.div
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      {/* <h2 className={`text-4xl font-semibold text-(--text) mb-10 `}>
        Get in Touch
      </h2> */}

      <HeroHighlight className="m-5  rounded-2xl flex flex-col items-center justify-center px-4 md:px-12   gap-10">
        <div className="-text-white text-4xl p-2  font-semibold">
          <HighlightText
            text="Get In Touch"
            className="px-5 rounded-[0.5rem]"
            inView={true}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        <div className="w-full sm:max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 space-y-6 w-full"
          >
            <div>
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="box" />
              <input
                type="hidden"
                name="_next"
                value="https://saadmasood.vercel.app/#form-submitted"
              />

              <Input
                type="textarea"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter Message"
                className="w-full h-40 p-4 border  resize-none focus:outline-none focus:ring-2 bg-[#121212] rounded-[0.5rem] text-white"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="p-3 border  bg-[#121212] rounded-[0.5rem] text-white w-full"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="p-3 bg-[#121212] w-full rounded-[0.5rem] text-white"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <Input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Enter Subject"
                className="w-full p-3 bg-[#121212] text-white rounded-[0.5rem]"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            {/* <button
              type="submit"
              className="w-40 py-3 text-(--theme) border border-(--theme) rounded hover:bg-(--theme) hover:text-(--text) cursor-pointer  transition duration-300"
            >
              SEND MESSAGE
            </button> */}
            <AnimatedButton />
          </form>

          {/* Contact Info Section */}
          <div className="space-y-6">
            <ContactInfo icon={<FaLocationDot />} title="Karachi, Pakistan" />
            <ContactInfo icon={<FaPhoneAlt />} title="+92 315 2835233" />
            <ContactInfo
              icon={<IoMdMail />}
              title="saad.masood8.sm@gmail.com"
            />
          </div>
        </div>
      </HeroHighlight>
    </motion.div>
  );
}

function ContactInfo({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-2xl text-purple-600">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-gray-500">{text}</p>
      </div>
    </div>
  );
}
