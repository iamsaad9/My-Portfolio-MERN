import { motion } from "framer-motion";
import { LayoutTextFlip } from "../ui/layout-text-flip";
import { GradientText } from "../ui/shadcn-io/gradient-text";

const IntroSummary = () => {
  return (
    <section className="w-full flex items-center justify-center p-5 py-10 bg-(--secondary-background)">
      <div className="w-full md:w-[90%]  xl:w-[70%] flex flex-col-reverse sm:flex-row items-center justify-end gap-10">
        <div className="w-full sm:w-[50%] h-full flex flex-col gap-5 lg:gap-10">
          <div
            className={`text-2xl sm:text-2xl md:text-3xl lg:text-[2rem] 2xl:text-5xl  leading-snug `}
          >
            <motion.div className="flex">
              <LayoutTextFlip
                text=""
                words={[
                  "Full Stack Developer",
                  "Portfolio Creator",
                  "Website Developer",
                  "Frontend Designer",
                ]}
              />
            </motion.div>
            <span style={{ fontFamily: "Lora, serif" }}>
              <GradientText text="CSS Enthusiast"></GradientText>, and React &
              NextJs Aficionado.
            </span>
          </div>

          <span className="text-sm sm:text-xs md:text-sm lg:text-base text-(--secondary-text)">
            I specialize in crafting responsive, accessible, and pixel-perfect
            web interfaces. With a passion for clean code and smooth user
            experiences, I bring ideas to life using modern frontend tools — one
            component at a time.
          </span>
        </div>
      </div>
    </section>
  );
};

export default IntroSummary;
