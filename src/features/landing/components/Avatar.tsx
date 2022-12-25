import clsx from "clsx";
import React from "react";

export const Avatar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={clsx("rounded-full", className)}
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
    >
      <rect width="36" height="36" fill="#edd75a"></rect>
      <rect
        x="0"
        y="0"
        width="36"
        height="36"
        transform="translate(-4 8) rotate(168 18 18) scale(1)"
        fill="#0c8f8f"
        rx="36"
      ></rect>
      <g transform="translate(0 4) rotate(-8 18 18)">
        <path d="M13,19 a1,0.75 0 0,0 10,0" fill="#FFFFFF"></path>
        <rect
          x="11"
          y="14"
          width="1.5"
          height="2"
          rx="1"
          stroke="none"
          fill="#FFFFFF"
        ></rect>
        <rect
          x="23"
          y="14"
          width="1.5"
          height="2"
          rx="1"
          stroke="none"
          fill="#FFFFFF"
        ></rect>
      </g>
    </svg>
  );
};
