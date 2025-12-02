"use client";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaGithub } from "react-icons/fa";
import { SiVercel } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const projects = [
  {
    title: "Tasty",
    description:
      "A modern food delivery app with a sleek UI and real-time order tracking functionality.",
    image: "/assets/pics/project.png",
    techStack: ["Web Application", "Next.js", "TypeScript", "Tailwind CSS"],
    status: "Ongoing",
  },
  {
    title: "My Weatherly",
    description:
      "A responsive weather application that provides current conditions and forecasts for any location.",
    image: "/images/Projects/my_weatherly_1.jpg",
    techStack: ["Web Application", "React", "JavaScript"],
    status: "Pending",
  },
  {
    title: "Portfolio",
    description:
      "A personal portfolio site showcasing projects and skills, built with Tailwind CSS and JavaScript.",
    image: "/images/Projects/portfolio_1.png",
    techStack: ["Portfolio", "Tailwind CSS", "JavaScript"],
    status: "Completed",
  },
  {
    title: "CakeShop",
    description:
      "A static multi-page website designed for a bakery or cake shop business.",
    image: "/images/Projects/cakeshop_1.png",
    techStack: ["Website", "Tailwind CSS", "JavaScript"],
    status: "Pending",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online shopping platform with cart management and payment integration.",
    image: "/assets/pics/project.png",
    techStack: ["Web Application", "React", "Node.js", "MongoDB"],
    status: "Completed",
  },
  {
    title: "Task Manager",
    description:
      "A productivity app for managing tasks, deadlines, and team collaboration.",
    image: "/assets/pics/project.png",
    techStack: ["Web Application", "Vue.js", "Firebase"],
    status: "Ongoing",
  },
];

function ProjectsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY = 4;
  const displayedProjects = showAll
    ? projects
    : projects.slice(0, INITIAL_DISPLAY);

  const handleToggle = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[90rem] mx-auto my-20 p-2 sm:p-5 xl:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{
                duration: 0.2,
                delay: index * 0.1,
                layout: { duration: 0.2 },
              }}
              key={index}
              className="flex flex-col group md:h-64 lg:h-96 relative rounded-2xl overflow-hidden shadow-lg border-2 border-gray-700 hover:border-gray-500 transition-all duration-300 cursor-pointer"
              onHoverStart={() => handleToggle(index)}
              onHoverEnd={() => handleToggle(null)}
            >
              <motion.img
                loading="lazy"
                src={project.image}
                alt={project.title}
                className="w-full h-full opacity-50 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className={`flex flex-col p-5 lg:p-10 2xl:py-15 backdrop-blur-lg transition-opacity duration-500 gap-5 h-full w-full justify-between items-start absolute inset-0
                  ${openIndex === index ? "opacity-100" : "opacity-0"} 
                  group-hover:opacity-100`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col gap-2 sm:gap-5">
                  <motion.h2
                    className="text-2xl lg:text-5xl xl:text-5xl  font-bold"
                    style={{ fontFamily: "Lora, serif" }}
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {project.title}
                  </motion.h2>
                  <motion.p
                    className="text-[0.7rem] sm:text-sm xl:text-base text-gray-300"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.description}
                  </motion.p>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.techStack.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="bg-blue-600 px-3 py-1 rounded-full text-[0.7rem] sm:text-xs lg:text-sm"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
                <div className="flex w-full items-center justify-between">
                  <motion.span
                    className="text-xs md:text-sm flex items-center justify-center gap-2"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Status –
                    <div
                      className={`p-2 lg:px-4 border-2 rounded-full uppercase ${
                        project.status === "Completed"
                          ? "border-green-500 text-green-500"
                          : project.status === "Ongoing"
                          ? "border-orange-500 text-orange-500"
                          : "border-red-600 text-red-600"
                      }`}
                    >
                      {project.status}
                    </div>
                  </motion.span>

                  <div className="flex gap-5 px-5 items-center justify-center">
                    <a href="">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <FaGithub
                            size={20}
                            className="hover:scale-110 transition-all duration-200"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>GitHub</p>
                        </TooltipContent>
                      </Tooltip>
                    </a>
                    <a href="">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SiVercel
                            size={20}
                            className="hover:scale-110 transition-all duration-200"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Vercel</p>
                        </TooltipContent>
                      </Tooltip>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {projects.length > INITIAL_DISPLAY && (
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <span className="relative z-10 flex items-center gap-2">
              {showAll ? (
                <>
                  Show Less
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronUp className="w-5 h-5" />
                  </motion.div>
                </>
              ) : (
                <>
                  Show All Projects
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </>
              )}
            </span>
          </motion.button>
        </motion.div>
      )}

      {!showAll && projects.length > INITIAL_DISPLAY && (
        <motion.div
          className="text-center mt-6 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-sm">
            Showing {INITIAL_DISPLAY} of {projects.length} projects
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default ProjectsSection;
