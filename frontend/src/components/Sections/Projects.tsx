"use client";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaGithub } from "react-icons/fa";
import { SiVercel } from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CiIcons from "react-icons/ci";
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";
import * as RiIcons from "react-icons/ri";
import * as DiIcons from "react-icons/di";
import type { IconType } from "react-icons";
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

  const DynamicIcon = ({ iconName }: { iconName: string; size?: number }) => {
    const prefix = iconName.slice(0, 2) as keyof typeof iconPacks;
    const pack = iconPacks[prefix];

    if (!pack) return null;

    const Icon = pack[iconName];
    return Icon ? <Icon className="size-4 sm:size-5" /> : null;
  };

  return (
    <>
      <div className="w-full flex items-center justify-center mt-5">
        <span className=" text-base sm:text-xl border-b-1  uppercase font-light  border-white/60 text-white/60 ">
          more projects
        </span>
      </div>
      {filteredProjects.length === 0 && (
        <div className="w-full flex items-center justify-center mt-10">
          <span className=" text-base sm:text-xl  uppercase font-light   text-white/60 ">
            No projects found.
          </span>
        </div>
      )}
      <div className="max-w-[90rem] mx-auto mb-10 sm:mb-20 p-5 xl:p-10 ">
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
                className="flex flex-col  group md:h-64 lg:h-96 relative rounded-2xl overflow-hidden shadow-lg border border-white/60  transition-all duration-300 cursor-pointer"
                onHoverStart={() => handleToggle(index)}
                onHoverEnd={() => handleToggle(null)}
                onClick={() => handleToggle(index)}
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
                      className="flex flex-wrap gap-3 sm:gap-4" // Increased gap for icons
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className=" flex border border-white/70 rounded-3xl px-2 backdrop-blur-2xl">
                        {project.techStack.map((iconName, idx) => (
                          <Tooltip key={idx}>
                            <TooltipTrigger asChild>
                              <motion.div className="p-2 rounded-lg ">
                                <DynamicIcon iconName={iconName} />
                              </motion.div>
                            </TooltipTrigger>
                            <TooltipContent>
                              {/* This strips the prefix like "Si" from the name for the tooltip */}
                              <p>{iconName.replace(/^[A-Z][a-z]/, "")}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  <div className="flex w-full items-center justify-between mt-auto">
                    <div className="flex gap-5 px-2 items-center justify-center">
                      {/* Dynamic GitHub Link */}
                      {project.gitHubLink && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href={project.gitHubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaGithub
                                size={22}
                                className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
                              />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>GitHub Source</p>
                          </TooltipContent>
                        </Tooltip>
                      )}

                      {/* Dynamic Vercel/Live Link */}
                      {project.vercelLink && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href={project.vercelLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <SiVercel
                                size={20}
                                className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
                              />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Live Demo</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
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
    </>
  );
}

export default ProjectsSection;
