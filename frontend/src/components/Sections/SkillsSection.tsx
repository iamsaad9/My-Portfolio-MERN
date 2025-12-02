import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import AnimatedCard from "@/components/ui/AnimatedCard";
import { FaReact, FaGithub, FaNode } from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiJavascript,
  SiExpress,
  SiTypescript,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { RiTailwindCssFill } from "react-icons/ri";
import { DiMysql } from "react-icons/di";

const skills = [
  {
    name: "JavaScript",
    icon: <SiJavascript size={80} />,
    description:
      "Experienced in modern JavaScript (ES6+) for building interactive and dynamic web interfaces.",
  },
  {
    name: "React",
    icon: <FaReact size={80} />,
    description:
      "Skilled in building component-based UIs, managing state, and optimizing performance using React.",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs size={80} />,
    description:
      "Experienced with server-side rendering (SSR), static site generation (SSG), API routes, and full-stack Next.js apps.",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript size={80} />,
    description:
      "Proficient in using TypeScript to enhance code quality, maintainability, and catch errors early in development.",
  },
  {
    name: "Node.js",
    icon: <FaNode size={80} />,
    description:
      "Proficient in building scalable backend services, RESTful APIs, and real-time applications using Node.js.",
  },
  {
    name: "Express.js",
    icon: <SiExpress size={80} />,
    description:
      "Adept at building robust and scalable RESTful APIs, handling routing, middleware, and integrating with databases using Express.js.",
  },
  {
    name: "Tailwind CSS",
    icon: <RiTailwindCssFill size={80} />,
    description:
      "Proficient in building responsive, modern UIs efficiently using Tailwind’s utility-first classes.",
  },
  {
    name: "Framer Motion",
    icon: <TbBrandFramerMotion size={80} />,
    description:
      "Capable of creating smooth animations, transitions, and motion effects to elevate user experience.",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb size={80} />,
    description:
      "Experienced in designing NoSQL schemas, aggregations, and managing scalable database architectures.",
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql size={80} />,
    description:
      "Skilled in relational database design, writing complex SQL queries, and database optimization.",
  },
  {
    name: "MySQL",
    icon: <DiMysql size={80} />,
    description:
      "Proficient in SQL database management, schema design, and ensuring data efficiency and integrity.",
  },
  {
    name: "GitHub",
    icon: <FaGithub size={80} />,
    description:
      "Experienced in version control, branching strategies, and collaborative development using Git and GitHub.",
  },
];

const SkillsSection = () => {
  return (
    <div
      className="flex items-center justify-center max-w-7xl mx-auto flex-col"
      style={{ fontFamily: "Lora, serif" }}
    >
      <TextHoverEffect text="SKILLS" />

      <div className="w-[80%] grid grid-cols-3 gap-y-14 content-center place-items-center">
        {skills.map((skill) => (
          <AnimatedCard
            frontContent={
              <div className="flex flex-col gap-5 items-center justify-center h-full">
                {skill.icon}
                <span
                  className="text-3xl mb-4 text-center"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  {skill.name}
                </span>
              </div>
            }
            backContent={
              <div className="flex items-center justify-center h-full p-10 z-1">
                <span className=" text-base text-center leading-relaxed">
                  {skill.description}
                </span>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
