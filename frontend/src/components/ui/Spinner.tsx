import React from "react";

interface SpinnerProps {
  size?: number;
  activeColor?: string;
  trackColor?: string;
  duration?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 48,
  activeColor = "var(--theme_2)",
  trackColor = "var(--theme_1)",
  duration = "8s",
}) => {
  return (
    <div className="flex items-center justify-center">
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes active-animation {
            0% { stroke-dasharray: 0 0 0 360 0 360; }
            12.5% { stroke-dasharray: 0 0 270 90 270 90; }
            25% { stroke-dasharray: 0 270 0 360 0 360; }
            37.5% { stroke-dasharray: 0 270 270 90 270 90; }
            50% { stroke-dasharray: 0 540 0 360 0 360; }
            50.001% { stroke-dasharray: 0 180 0 360 0 360; }
            62.5% { stroke-dasharray: 0 180 270 90 270 90; }
            75% { stroke-dasharray: 0 450 0 360 0 360; }
            87.5% { stroke-dasharray: 0 450 270 90 270 90; }
            87.501% { stroke-dasharray: 0 90 270 90 270 90; }
            100% { stroke-dasharray: 0 360 1 360 0 360; }
          }

          @keyframes track-animation {
            0% { stroke-dasharray: 0 20 320 40 320 40; }
            12.5% { stroke-dasharray: 0 290 50 310 50 310; }
            25% { stroke-dasharray: 0 290 320 40 320 40; }
            37.5% { stroke-dasharray: 0 560 50 310 50 310; }
            37.501% { stroke-dasharray: 0 200 50 310 50 310; }
            50% { stroke-dasharray: 0 200 320 40 320 40; }
            62.5% { stroke-dasharray: 0 470 50 310 50 310; }
            62.501% { stroke-dasharray: 0 110 50 310 50 310; }
            75% { stroke-dasharray: 0 110 320 40 320 40; }
            87.5% { stroke-dasharray: 0 380 50 310 50 310; }
            100% { stroke-dasharray: 0 380 320 40 320 40; }
          }

          .loader-svg {
            animation: spin 2s linear infinite;
            transform-origin: center;
          }

          .loader-active {
            stroke-dashoffset: 360;
            animation: active-animation ${duration} ease-in-out infinite;
          }

          .loader-track {
            stroke-dashoffset: 360;
            animation: track-animation ${duration} ease-in-out infinite;
          }
        `}
      </style>
      <svg
        className="loader-svg overflow-visible"
        viewBox="0 0 384 384"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size, height: size, rotate: "-90deg" }}
      >
        <circle
          className="loader-active"
          pathLength="360"
          fill="transparent"
          stroke={activeColor}
          strokeWidth="32"
          strokeLinecap="round"
          cx="192"
          cy="192"
          r="176"
        />
        <circle
          className="loader-track"
          pathLength="360"
          fill="transparent"
          stroke={trackColor}
          strokeWidth="32"
          strokeLinecap="round"
          cx="192"
          cy="192"
          r="176"
        />
      </svg>
    </div>
  );
};
