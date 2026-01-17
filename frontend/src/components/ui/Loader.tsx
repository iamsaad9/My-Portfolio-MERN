import React, { useEffect } from "react";
import useLoadingStore from "../../context/store/useLoadingStore.ts";

const Loader: React.FC = () => {
  const { isLoading, isColdStarting } = useLoadingStore();

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading, isColdStarting]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
        <style>
          {`
          @keyframes dash_682 {
            72.5% { opacity: 1; }
            to { stroke-dashoffset: 1; }
          }
          .animate-infinity-dash {
            stroke-width: 5;
            fill: none;
            stroke-dasharray: 50, 14;
            stroke-dashoffset: 192;
            animation: dash_682 1.4s linear infinite;
          }
        `}
        </style>

        <div className="relative flex flex-col items-center">
          <svg
            viewBox="0 0 187.3 93.7"
            height="250px"
            width="250px"
            className="drop-shadow-[1px_1px_15px_rgba(59,130,246,0.5)]"
          >
            <defs>
              <linearGradient y2="0%" x2="100%" y1="0%" x1="0%" id="gradient">
                <stop stopColor="var(--theme_3)" offset="0%"></stop>{" "}
                {/* Tailwind Pink-400 */}
                <stop stopColor="var(--theme_1)" offset="100%"></stop>{" "}
                {/* Tailwind Blue-500 */}
              </linearGradient>
            </defs>

            <path
              className="animate-infinity-dash"
              stroke="url(#gradient)"
              d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
            />
          </svg>
        </div>
        {isColdStarting && (
          <p className="mt-2 text-white text-xs sm:text-sm md:text-lg">
            Awaking server...This may take a few seconds.
          </p>
        )}
      </div>
    );
  }
};

export default Loader;
