import clsx from "clsx";
import React from "react";

export const TextSkeleton: React.FC<{
  className?: string;
  fluid?: boolean;
  animate?: boolean;
}> = ({ className, animate = true, fluid = false }) => {
  return (
    <div
      className={clsx(
        "rounded-full bg-gray-200",
        animate && "animate-pulse",
        fluid && "w-full",
        className,
      )}
    ></div>
  );
};
