import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import AnimatedCard from "@/components/ui/AnimatedCard";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CiIcons from "react-icons/ci";
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";
import * as RiIcons from "react-icons/ri";
import * as DiIcons from "react-icons/di";
import type { IconType } from "react-icons";
import { HighlightText } from "../ui/shadcn-io/highlight-text";

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

interface Skills {
  title: string;
  logo: string;
  description: string;
}

interface SkillsSectionProps {
  skills: Skills[];
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

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  return (
    <div
      id="skills"
      className="flex items-center justify-center max-w-7xl mx-auto flex-col"
      style={{ fontFamily: "Lora, serif" }}
    >
      {/* <TextHoverEffect text="SKILLS" /> */}
      <HighlightText
        text="SKILLS"
        inView={true}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-7xl px-4 sm:text-5xl md:text-6xl lg:text-9xl rounded-[0.5rem] my-10"
      />
      {skills.length != 0 ? (
        <div className="w-[80%] grid grid-cols-3 gap-y-14 content-center place-items-center">
          {skills.map((skill, index) => (
            <AnimatedCard
              key={index}
              frontContent={
                <div className="flex flex-col gap-5 items-center justify-center h-full">
                  <DynamicIcon iconName={skill.logo} />

                  <span
                    className="text-3xl mb-4 text-center"
                    style={{ fontFamily: "Raleway, sans-serif" }}
                  >
                    {skill.title}
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
      ) : (
        <div className="flex items-center justify-center h-full w-full gap-5 my-10">
          <p className="text-xl">Something doesnt seem right...</p>
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
