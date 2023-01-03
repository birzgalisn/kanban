import clsx from "clsx";
import React from "react";

export const AvatarSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={clsx("animate-pulse rounded-full bg-gray-200", className)}
    ></div>
  );
};
