"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollUpButton() {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      const passedThreshold = current > 300;
      const scrollingUp = current < lastScrollY.current;

      setVisible(passedThreshold && scrollingUp);

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`button fixed right-5 bottom-5 z-50 transition-all duration-300 ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronUp id="upIcon" className="animate-bounce" size={20} />
      </button>

      <style>{`
        .button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--bg-secondary);
          border: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0px 0px 0px 2px var(--theme_1);
          cursor: pointer;
          transition-duration: 0.3s;
          overflow: hidden;
        }

        .button:hover {
          width: 140px;
          border-radius: 50px;
          background-color: var(--bg-secondary);
          transition-duration: 0.3s;
          align-items: center;
        }

        .button:hover #upIcon {
          display: none;
        }

        .button::before {
          position: absolute;
          bottom: -20px;
          content: "Back to Top";
          color: white;
          font-size: 0px;
        }

        .button:hover::before {
          font-size: 13px;
          opacity: 1;
          bottom: unset;
          transition-duration: 0.3s;
        }
      `}</style>
    </>
  );
}
