import TextPressure from "../ui/shadcn-io/text-pressure";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Orb from "../ui/Orb";
import LaserFlow from "../ui/LaserFlow";
const useIsMobile = (breakpoint: number) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 1. Create a function to check the width
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // 2. Run it once on mount
    checkIsMobile();

    // 3. Add event listener for resizing
    window.addEventListener("resize", checkIsMobile);

    // 4. Clean up listener on unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [breakpoint]);

  return isMobile;
};

const Hero = () => {
  const isMobileDevice = useIsMobile(1000);
  return (
    <div className="h-screen w-full  flex flex-col items-center justify-center relative overflow-hidden rounded-md">
      <div
        className={cn(
          "absolute inset-0 opacity-20",
          "[background-size:60px_60px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_2px,transparent_1px),linear-gradient(to_bottom,#171616_2px,transparent_1px)]",
          "[background-image:linear-gradient(to_right,#262626_2px,transparent_1px),linear-gradient(to_bottom,#171616_2px,transparent_1px)]"
        )}
      />
      <div className={`absolute inset-0 ${isMobileDevice ? "-mt-10" : ""}`}>
        {isMobileDevice ? (
          <Orb
            hue={0}
            hoverIntensity={0.1}
            rotateOnHover
            forceHoverState={false}
          />
        ) : (
          <LaserFlow
            color="#3b82f6"
            wispDensity={1}
            flowSpeed={0.35}
            verticalSizing={5}
            horizontalSizing={0.5}
            fogIntensity={0.45}
            fogScale={0.3}
            wispSpeed={15}
            wispIntensity={5}
            flowStrength={0.25}
            decay={1.1}
            horizontalBeamOffset={0}
            verticalBeamOffset={-0.5}
          />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      {/* Radial gradient for the container to give a faded look */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="p-5  z-20"
      >
        <div className="relative w-full flex items-center justify-center px-4 sm:px-12">
          <TextPressure
            text="SaadMasood"
            flex={true}
            alpha={false}
            stroke={false}
            width={false}
            weight={true}
            italic={false}
            textColor="currentColor"
            minFontSize={10}
            className="text-foreground"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} // Note: opacity max is usually 1
        transition={{ duration: 2, delay: 0.5 }}
        className="w-[40rem] sm:w-[50rem] md:w-[60rem] h-20  relative flex justify-center "
      >
        {/* Gradients */}

        {/* Core Indigo Gradient (Blur) */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />

        {/* Core Indigo Gradient (Solid) */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />

        {/* Inner Sky Blue Gradient (Blur) */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />

        {/* Inner Sky Blue Gradient (Solid) */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        {/* Core component */}
      </motion.div>
    </div>
  );
};

export default Hero;
