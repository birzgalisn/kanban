import clsx from "clsx";
import React from "react";

export const AvatarSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 right-0 mb-4 mr-4 h-6 w-6 rounded-full bg-gray-200",
        className,
      )}
    ></div>
  );
};
