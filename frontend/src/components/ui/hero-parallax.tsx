"use client";
import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion"; // Changed from motion/react for standard compatibility

export const HeroParallax = ({
  projects,
}: {
  projects: {
    thumbnail: string;
  }[];
}) => {
  // 1. Monitor window width to adjust parallax intensity
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate dynamic movement based on screen size
  // Mobile moves less (400px), Desktop moves more (1000px)
  const movementRange = windowWidth < 768 ? 400 : 1000;

  const firstRow = projects.slice(0, 5);
  const secondRow = projects.slice(5, 10);
  const thirdRow = projects.slice(10, 15);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Use the dynamic movementRange here
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, movementRange]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -movementRange]),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );

  // Adjust vertical lift for mobile
  const translateY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2],
      [windowWidth < 768 ? -200 : -500, 500]
    ),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[270vh] md:h-[300vh] py-10 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        {/* Row 1 */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-6 md:space-x-20 mb-10 md:mb-20">
          {firstRow.map((project) => (
            <ProjectCard
              project={project}
              translate={translateX}
              key={project.thumbnail}
            />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div className="flex flex-row mb-10 md:mb-20 space-x-6 md:space-x-20">
          {secondRow.map((project) => (
            <ProjectCard
              project={project}
              translate={translateXReverse}
              key={project.thumbnail}
            />
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-6 md:space-x-20">
          {thirdRow.map((project) => (
            <ProjectCard
              project={project}
              translate={translateX}
              key={project.thumbnail}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-30 sm:py-30 px-4 w-full  left-0 top-0">
      <h1
        className="text-4xl md:text-7xl font- dark:text-white"
        style={{ fontFamily: "Lora, serif" }}
      >
        Building With Passion <br /> & Precision
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-10 dark:text-neutral-200">
        From concept to deployment, delivering reliable solutions using modern
        frameworks and technologies.
      </p>
    </div>
  );
};

export const ProjectCard = ({
  project,
  translate,
}: {
  project: { thumbnail: string };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/project h-60 w-[15rem] md:h-96 md:w-[30rem] relative shrink-0 rounded-xl overflow-hidden"
    >
      <img
        src={project.thumbnail}
        className="object-cover object-left-top absolute h-full w-full inset-0 cursor-pointer"
        alt="thumbnail"
      />
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/project:opacity-20 bg-black transition duration-200 pointer-events-none" />
    </motion.div>
  );
};
