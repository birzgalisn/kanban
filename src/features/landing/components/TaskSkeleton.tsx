import clsx from "clsx";
import React from "react";

import { AvatarSkeleton } from "./AvatarSkeleton";
import { TextSkeleton } from "./TextSkeleton";

export const TaskSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={clsx(
        "relative flex max-h-20 w-64 flex-1 flex-col gap-2 rounded-lg bg-white p-4 shadow-xl",
        className,
      )}
    >
      <TextSkeleton className="h-4 w-36" />
      <TextSkeleton className="h-3 w-16" />
      <AvatarSkeleton />
    </div>
  );
};
