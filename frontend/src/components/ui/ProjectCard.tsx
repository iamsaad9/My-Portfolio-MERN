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

interface ProjectCardProps {
  project: Project;
}

const DynamicIcon = ({ iconName }: { iconName: string; size?: number }) => {
  const prefix = iconName.slice(0, 2) as keyof typeof iconPacks;
  const pack = iconPacks[prefix];

  if (!pack) return null;

  const Icon = pack[iconName];
  return Icon ? <Icon className="size-4 sm:size-5" /> : null;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="h-full w-full max-w-7xl flex flex-col gap-3 md:gap-5 p-3 md:p-5 rounded-2xl border border-white/50 mx-auto bg-black/20">
      <div className="w-full overflow-hidden rounded-xl">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="w-full flex flex-col  gap-3 md:gap-5">
        <div className="flex flex-row items-center justify-between gap-3">
          <h1 className="text-2xl md:text-5xl sm:font-semibold break-words line-clamp-1">
            {project.title}
          </h1>

          <div className="flex-shrink-0">
            <ul className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              {project.techStack.map((tech, index) => (
                <li
                  key={index}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <DynamicIcon iconName={tech} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col  items-start  justify-between gap-4">
          <p className="text-xs sm:text-sm md:text-base text-white/60 w-full  leading-relaxed">
            {project.description}
          </p>

          <div className="flex gap-2 sm:gap-5 items-center justify-end  w-full ">
            {project.gitHubLink && (
              <a href={project.gitHubLink} target="_blank" rel="noreferrer">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FaGithub className="size-4 sm:size-5 hover:scale-110 cursor-pointer hover:text-white transition-all duration-200 text-white/70" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </a>
            )}
            {project.vercelLink && (
              <a href={project.vercelLink} target="_blank" rel="noreferrer">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SiVercel className="size-4 sm:size-5 hover:scale-110 cursor-pointer hover:text-white transition-all duration-200 text-white/70" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Vercel</p>
                  </TooltipContent>
                </Tooltip>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
