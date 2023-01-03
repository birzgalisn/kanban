import clsx from "clsx";
import React from "react";

import { AvatarSkeleton } from "./AvatarSkeleton";

export const AvatarGroupSkeleton: React.FC<{
  count: number;
  size: string;
}> = ({ count, size }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, idx) => {
          const isEven = idx % 2;
          return (
            <AvatarSkeleton
              key={idx}
              className={clsx("bg-gray-200", size, isEven && "bg-gray-100")}
            />
          );
        })}
    </>
  );
};
