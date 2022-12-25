import clsx from "clsx";
import React from "react";

export const TextSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return <div className={clsx("rounded-full bg-gray-200", className)}></div>;
};
