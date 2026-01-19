"use client";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import TypingText from "../ui/shadcn-io/typing-text";
function Footer() {
  return (
    <div className="w-full flex p-5 md:p-10 pt-20 justify-center items-center bg-[#121212]">
      <div className="lg:w-[80%] xl:w-[70%] p-5 flex flex-col gap-30 justify-center items-center ">
        <div className=" flex flex-col gap-5 md:gap-10 items-center justify-center">
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center`}
          >
            <TypingText
              text={[
                "Let’s discuss for a project.",
                "Build well animated websites.",
              ]}
              typingSpeed={85}
              pauseDuration={1500}
              showCursor={true}
              cursorClassName="h-12"
              startOnVisible={true}
              textColors={["#8b5cf6"]}
              variableSpeed={{ min: 50, max: 120 }}
            />
          </h1>
          <span className="w-full md:w-[60%] lg:w-[70%] text-xs md:text-sm lg:text-base text-center md:px-10">
            I am available for frontend contract projects—whether it’s a
            portfolio, website, or any web application. I specialize in React.js
            and Next.js, and can implement modern UI libraries to deliver
            high-quality user experiences. Contact me if you want to collaborate
            on your next project!
          </span>
        </div>

        <div className="w-full my-5 pb-20 flex items-center justify-between border-b-1 border-(--secondary-text)">
          <span className="text-(--foreground) text-xs sm:text-sm md:text-base">
            © {new Date().getFullYear()} My Portfolio. All rights reserved.{" "}
            <a
              href="/privacy"
              className="text-xs sm:text-sm md:text-base cursor-pointer text-(--theme_1) hover:font-bold"
            >
              Privacy Policy
            </a>
          </span>
          <div className="flex gap-3 md:gap-5">
            <a
              href="mailto:saad.masood8.sm@gmail.com"
              className="text-(--foreground)"
              target="_blank"
              title="Send Email"
            >
              <FaGoogle className="hover:scale-120 transition-all size-5 md:size-7 duration-300 hover:text-[#6e11b0]" />
            </a>
            <a
              href="https://github.com/iamsaad9"
              className="text-(--foreground)"
              target="_blank"
              title="GitHub Profile"
            >
              <FaGithub
                target="_blank"
                size={25}
                className="hover:scale-120 transition-all duration-300 size-5 md:size-7 hover:text-[#6e11b0]"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/saad-m-08b832126"
              target="_blank"
              title="LinkedIn Profile"
            >
              <FaLinkedin
                size={25}
                className="hover:scale-120 transition-all duration-300 size-5 md:size-7 hover:text-[#6e11b0]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
