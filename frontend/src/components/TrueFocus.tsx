import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import "./TrueFocus.css";

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = "True Focus",
  separator = " ",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words: string[] = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [focusRect, setFocusRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === null ? 0 : (prev + 1) % words.length));
      }, (animationDuration + pauseBetweenAnimations) * 1000);

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (typeof currentIndex !== "number" || currentIndex < 0) return;

    const currentEl = wordRefs.current[currentIndex];
    if (!currentEl || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = currentEl.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex ?? 0);
    }
  };

  return (
    <div className="focus-container my-5 sm:my-10" ref={containerRef}>
      {words.map((word, index) => {
        const isActive =
          typeof currentIndex === "number" && index === currentIndex;
        return (
          <span
            key={index}
            ref={(el: HTMLSpanElement | null) => {
              wordRefs.current[index] = el;
            }}
            className={`focus-word text-7xl! sm:text-8xl! md:text-9xl! font-bold! ${
              manualMode ? "manual" : ""
            } ${isActive && !manualMode ? "active" : ""}`}
            style={{
              filter: manualMode
                ? isActive
                  ? `blur(0px)`
                  : `blur(${blurAmount}px)`
                : isActive
                ? `blur(0px)`
                : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`,
              // allow CSS custom properties via cast
              ...({
                "--border-color": borderColor,
                "--glow-color": glowColor,
              } as React.CSSProperties),
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame "
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity:
            typeof currentIndex === "number" && currentIndex >= 0 ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
        }}
        style={{}}
      >
        <span className="corner top-left "></span>
        <span className="corner top-right "></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </motion.div>
    </div>
  );
};

export default TrueFocus;
