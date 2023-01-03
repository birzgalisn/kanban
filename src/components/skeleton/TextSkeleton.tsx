import clsx from "clsx";
import React from "react";

export const TextSkeleton: React.FC<{
  className?: string;
  fluid?: boolean;
}> = ({ className, fluid = false }) => {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-full bg-gray-200",
        fluid && "w-full",
        className,
      )}
    ></div>
  );
};
