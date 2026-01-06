import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaGithub } from "react-icons/fa";
import { SiVercel } from "react-icons/si";

interface Project {
  title: string;
  description: string;
  gitHubLink?: string;
  vercelLink?: string;
  image: string;
  isSpecial: boolean;
  techStack: string[];
  startedAt?: string;
  endedAt?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="h-full w-7xl flex flex-col gap-5 p-5 rounded-2xl border-2 border-[#333] mx-auto">
      <img src={project.image} alt="" className="rounded-2xl" />
      <div className="w-full flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-semibold">{project.title}</h1>
          <div>
            <ul className="flex gap-2">
              {project.techStack.map((tech, index) => (
                <li key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h1>{tech}</h1>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tech}</p>
                    </TooltipContent>
                  </Tooltip>
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
