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

const DynamicIcon = ({
  iconName,
  size = 70,
}: {
  iconName: string;
  size?: number;
}) => {
  const prefix = iconName.slice(0, 2) as keyof typeof iconPacks;
  const pack = iconPacks[prefix];

  if (!pack) return null;

  const Icon = pack[iconName];
  return Icon ? <Icon size={size} /> : null;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="h-full w-7xl flex flex-col gap-5 p-5 rounded-2xl border-2 border-[#333] mx-auto">
      <img src={project.coverImage} alt="" className="rounded-2xl" />
      <div className="w-full flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-semibold">{project.title}</h1>
          <div>
            <ul className="flex gap-4">
              {project.techStack.map((tech, index) => (
                <li key={index}>
                  <DynamicIcon iconName={tech} size={20} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white/50 w-[70%]">{project.description}</p>

          <div className="flex gap-5 px-5 items-center justify-center">
            {project.gitHubLink && (
              <a href={project.gitHubLink}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FaGithub
                      size={30}
                      className="hover:scale-110 transition-all duration-200"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </a>
            )}
            {project.vercelLink && (
              <a href="">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SiVercel
                      size={30}
                      className="hover:scale-110 transition-all duration-200"
                    />
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
