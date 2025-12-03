"use client";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SuperToggleButtonProps {
  showAll: boolean;
  setShowAll: (value: boolean) => void;
}

export default function SuperToggleButton({
  showAll,
  setShowAll,
}: SuperToggleButtonProps) {
  return (
    <>
      <motion.button
        onClick={() => setShowAll(!showAll)}
        className="super-button group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          {showAll ? (
            <>
              Show Less
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronUp className="w-5 h-5 text-cyan-400" />
              </motion.div>
            </>
          ) : (
            <>
              Show All Projects
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="w-5 h-5 text-cyan-400" />
              </motion.div>
            </>
          )}
        </span>
      </motion.button>

      <style>{`
        .super-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px 28px;
          background: linear-gradient(145deg, #0f0f0f, #1c1c1c);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 100px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s ease-in-out;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          z-index: 1;
        }

        .super-button::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, #00ffff, #ff00ff, #00ffff);
          animation: rotate 4s linear infinite;
          z-index: -2;
        }

        .super-button::after {
          content: "";
          position: absolute;
          inset: 2px;
          background: #0a0a0a;
          border-radius: inherit;
          z-index: -1;
        }

        .super-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 40px rgba(0, 255, 255, 0.2);
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
