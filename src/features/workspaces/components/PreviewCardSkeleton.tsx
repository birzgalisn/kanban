import React from "react";

import { HiOutlineArrowRight } from "react-icons/hi2";

export const PreviewCardSekeleton: React.FC<{}> = () => {
  return (
    <div className="flex h-24 w-80 shrink-0 flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <div className="mb-2 h-6 w-48 animate-pulse rounded-full bg-gray-200"></div>
      <div className="flex w-full animate-pulse flex-row items-center justify-between overflow-hidden">
        <div className="mx-2 flex w-full flex-1">
          <div className="-ml-2 h-6 w-6 rounded-full bg-gray-200"></div>
          <div className="-ml-2 h-6 w-6 rounded-full bg-gray-300"></div>
          <div className="-ml-2 h-6 w-6 rounded-full bg-gray-200"></div>
        </div>
        <div className="flex w-full justify-end">
          <HiOutlineArrowRight className="h-4 w-4 stroke-gray-400 stroke-2 opacity-70" />
        </div>
      </div>
    </div>
  );
};
