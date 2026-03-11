import React from "react";

export const RemotionLogo: React.FC = () => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Remotion triangle logo */}
      <polygon
        points="200,40 370,330 30,330"
        fill="#0B84F3"
      />
      <polygon
        points="200,100 310,290 90,290"
        fill="#ffffff"
      />
      <polygon
        points="200,160 260,260 140,260"
        fill="#0B84F3"
      />
    </svg>
  );
};
