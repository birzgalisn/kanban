import clsx from 'clsx';
import React from 'react';

import { sizes } from '@/ui/button';

export const ButtonSkeleton: React.FC<{
  size?: keyof typeof sizes;
  fluid?: boolean;
  className?: string;
}> = ({ size = 'md', fluid = false, className }) => {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-lg bg-gray-200',
        sizes[size],
        fluid && 'w-full',
        className,
      )}
    ></div>
  );
};
