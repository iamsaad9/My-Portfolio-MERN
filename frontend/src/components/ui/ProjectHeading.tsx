import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GradientText } from "./shadcn-io/gradient-text";

function ProjectsHeading() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Tailwind's md breakpoint
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize); // update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use different scroll speed based on device
  const xLeft = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["20%", "-20%"] : ["20%", "-50%"]
  );
  const xRight = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["-20%", "20%"] : ["-20%", "50%"]
  );

  return (
    <div
      id="projects"
      ref={containerRef}
      className="w-full flex flex-col px-2 justify-center mb-10 overflow-hidden"
    >
      <motion.h1
        style={{ x: xRight, fontFamily: "Lora, serif" }}
        className={`tracking-tighter text-[4rem] sm:text-[7rem] md:text-[8rem] lg:text-[9rem] xl:text-[10rem] 2xl:text-[13rem] leading-[1] uppercase self-start text-[var(--bg-secondary)]`}
      >
        Latest &
      </motion.h1>

      <motion.h1
        style={{ x: xLeft }}
        className={`text-[4rem] sm:text-[7rem] md:text-[8rem] lg:text-[9rem] xl:text-[10rem] 2xl:text-[13rem] leading-[1] uppercase  self-end `}
      >
        <GradientText
          text="Greatests"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: "600" }}
        />
      </motion.h1>
    </div>
  );
}

export default ProjectsHeading;
