import clsx from "clsx";
import React, { forwardRef } from "react";

import type { ModalHandle } from "@/components/modal";

type IconProps = { startIcon?: React.ReactElement };

type CreateButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  modalRef?: React.RefObject<ModalHandle>;
  className?: string;
} & IconProps;

export const CreateButton = forwardRef<HTMLButtonElement, CreateButtonProps>(
  ({ title, startIcon, modalRef, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "flex h-24 w-80 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-transparent text-lg font-semibold duration-300 ease-in-out enabled:hover:border-solid enabled:hover:bg-gray-50 enabled:hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70",
          className,
        )}
        onClick={() => {
          if (modalRef && modalRef.current) {
            modalRef.current.toggleVisibility();
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

CreateButton.displayName = "Create button";
