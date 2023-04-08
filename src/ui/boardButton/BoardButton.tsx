import clsx from 'clsx';
import React, { forwardRef } from 'react';

import type { ModalHandle } from '@/components/modal';

type IconProps = { startIcon?: React.ReactElement };

type BoardButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  createModalRef?: React.RefObject<ModalHandle>;
  className?: string;
  sizes?: string;
} & IconProps;

export const BoardButton = forwardRef<HTMLButtonElement, BoardButtonProps>(
  ({ title, startIcon, createModalRef, className, sizes = 'min-h-24 w-80', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'flex shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-transparent text-lg font-semibold duration-300 ease-in-out enabled:hover:border-solid enabled:hover:bg-gray-50 enabled:hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70',
          sizes,
          className,
        )}
        onClick={() => {
          if (createModalRef && createModalRef.current) {
            createModalRef.current.toggleVisibility();
          }
        }}
        {...props}
      >
        {startIcon}
        <span className="mx-2">{title}</span>
      </button>
    );
  },
);

BoardButton.displayName = 'Create button';
