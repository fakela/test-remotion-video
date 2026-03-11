import React from "react";
import { AbsoluteFill } from "remotion";

export const GridBackground: React.FC = () => {
  const gridSize = 40;
  const lineColor = "#e8e8e8";

  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={lineColor}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </AbsoluteFill>
  );
};
