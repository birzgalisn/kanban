import clsx from "clsx";
import React from "react";

import { TextSkeleton } from "@/components/skeleton";
import { TaskScaffold } from "./TaskScaffold";

export const GroupScaffold: React.FC<{
  className?: string;
  children?: React.ReactNode;
  tasks: number;
}> = ({ className, children, tasks }) => {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <TextSkeleton className="h-3 w-20" />
      {children}
      {Array(tasks)
        .fill(0)
        .map((_, idx) => (
          <TaskScaffold key={idx} />
        ))}
    </div>
  );
};
