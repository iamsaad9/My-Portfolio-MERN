import { GoProjectRoadmap } from "react-icons/go";
import { MdCall } from "react-icons/md";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { GoHome } from "react-icons/go";
import { CiPalette } from "react-icons/ci";
import { LuMessageSquareQuote } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Header = () => {
  return (
    <div className="flex justify-center">
      <nav
        className="  mx-auto rounded-full border my-2 fixed flex justify-center items-center  z-50"
        style={{ backdropFilter: "blur(30px)" }}
      >
        <ul>
          <li className="flex gap-5 p-1 px-5">
            <a
              href="/"
              className="text-md p-3  cursor-pointer hover:scale-115 transition-all duration-200"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <GoHome size={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>
            </a>

            <a
              href="#skills"
              className="text-md p-3  cursor-pointer hover:scale-115 transition-all duration-200 "
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <LiaProjectDiagramSolid size={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Skills</p>
                </TooltipContent>
              </Tooltip>
            </a>

            <a
              href="#services"
              className="text-md p-3  cursor-pointer hover:scale-115 transition-all duration-200 "
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <CiPalette size={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Services</p>
                </TooltipContent>
              </Tooltip>
            </a>

            <a
              href="#projects"
              className="text-md p-3  cursor-pointer hover:scale-115 transition-all duration-200 "
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <GoProjectRoadmap size={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Projects</p>
                </TooltipContent>
              </Tooltip>
            </a>

            <a
              href="#testimonials"
              className="text-md p-3  cursor-pointer hover:scale-115 transition-all duration-200 "
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <LuMessageSquareQuote size={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Testimonials</p>
                </TooltipContent>
              </Tooltip>
            </a>

            <a
              href="#contact"
              className="text-md p-3  cursor-pointer hover:scale-115 transition-all duration-200 "
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <MdCall size={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Contact</p>
                </TooltipContent>
              </Tooltip>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
