import clsx from "clsx";
import React from "react";

export const InputSkeleton: React.FC<{
  className?: string;
  fluid?: boolean;
  animate?: boolean;
}> = ({ className, animate = true, fluid = false }) => {
  return (
    <div
      className={clsx(
        "rounded-lg bg-gray-200",
        animate && "animate-pulse",
        fluid && "w-full",
        className,
      )}
    ></div>
  );
};
