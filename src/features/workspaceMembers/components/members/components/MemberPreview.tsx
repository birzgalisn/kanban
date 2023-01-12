import React from "react";

import {
  AvatarSkeleton,
  ButtonSkeleton,
  TextSkeleton,
} from "@/components/skeleton";

export const MemberPreview: React.FC<{}> = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center border-b p-4 last:border-b-0 sm:flex-row sm:pr-12">
      <div className="flex h-9 w-full items-center truncate pr-10 sm:flex-1 sm:pr-2">
        <AvatarSkeleton className="h-7 w-7 shrink-0" />
        <TextSkeleton className="ml-2 h-6 w-full sm:flex-1" fluid />
      </div>
      <TextSkeleton className="h-6 w-full sm:ml-2 sm:flex-1" fluid />
      <TextSkeleton className="h-6 w-full sm:ml-2 sm:mr-4 sm:flex-1" fluid />
      <div className="absolute top-4 right-4 block sm:flex">
        <ButtonSkeleton className="h-9 w-9" size="xs" />
      </div>
    </div>
  );
};
