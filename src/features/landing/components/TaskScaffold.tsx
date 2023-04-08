import clsx from 'clsx';
import React from 'react';

import { AvatarSkeleton, TextSkeleton } from '@/components/skeleton';

export const TaskScaffold: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={clsx(
        'relative flex max-h-20 w-64 flex-1 flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg',
        className,
      )}
    >
      <TextSkeleton className="h-4 w-36" />
      <TextSkeleton className="h-3 w-16" />
      <AvatarSkeleton className="absolute bottom-0 right-0 mb-4 mr-4 h-6 w-6" />
    </div>
  );
};
