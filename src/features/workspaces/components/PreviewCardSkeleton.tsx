import React from 'react';

import { AvatarGroupSkeleton, TextSkeleton } from '@/components/skeleton';
import { HiOutlineArrowRight } from 'react-icons/hi2';

export const PreviewCardSekeleton: React.FC = () => {
  return (
    <div className="flex h-24 w-full shrink-0 flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow">
      <TextSkeleton className="mb-2 h-6 w-48" />
      <div className="flex w-full animate-pulse flex-row items-center justify-between overflow-hidden">
        <div className="mx-2 flex w-full flex-1">
          <AvatarGroupSkeleton count={3} size="h-6 w-6 -ml-2" />
        </div>
        <div className="flex w-full justify-end">
          <HiOutlineArrowRight className="stroke-gray-400 stroke-2 opacity-70" />
        </div>
      </div>
    </div>
  );
};
