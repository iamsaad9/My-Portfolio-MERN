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
import SuperToggleButton from "../ui/ProjectButton";

interface Project {
  title: string;
  description: string;
  gitHubLink?: string;
  vercelLink?: string;
  coverImage: string;
  images: string[];
  isSpecial: boolean;
  techStack: string[];
  startedAt?: string;
  endedAt?: string;
}

interface ProjectProps {
  filteredProjects: Project[];
}

function ProjectsSection({ filteredProjects }: ProjectProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY = 4;
  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_DISPLAY);

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
              transition={{
                duration: 0.2,
                layout: { duration: 0.2 },
              }}
              key={index}
              className="flex flex-col group md:h-64 lg:h-96 relative rounded-2xl overflow-hidden shadow-lg border-2 border-gray-700 hover:border-gray-500 transition-all duration-300 cursor-pointer"
              onHoverStart={() => handleToggle(index)}
              onHoverEnd={() => handleToggle(null)}
            >
              <motion.img
                loading="lazy"
                src={project.coverImage}
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
                  {/* <motion.span
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
                  </motion.span> */}

                  <div className="flex gap-5 px-5 items-center justify-center ">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href="">
                          <FaGithub
                            size={20}
                            className="hover:scale-110 transition-all duration-200"
                          />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>GitHub</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href="">
                          <SiVercel
                            size={20}
                            className="hover:scale-110 transition-all duration-200"
                          />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Vercel</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length > INITIAL_DISPLAY && (
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <SuperToggleButton showAll={showAll} setShowAll={setShowAll} />
        </motion.div>
      )}

      {!showAll && filteredProjects.length > INITIAL_DISPLAY && (
        <motion.div
          className="text-center mt-6 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-sm">
            Showing {INITIAL_DISPLAY} of {filteredProjects.length} projects
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default ProjectsSection;
