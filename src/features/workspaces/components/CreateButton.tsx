import clsx from "clsx";
import React from "react";

import type { ModalHandle } from "@/components/modal";

export const CreateButton: React.FC<{
  modalRef?: React.RefObject<ModalHandle>;
  title: string;
  className?: string;
}> = ({ modalRef, title, className }) => {
  return (
    <button
      className={clsx(
        "flex h-24 w-80 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-transparent text-lg font-semibold duration-300 ease-in-out hover:border-solid hover:bg-gray-50 hover:opacity-80",
        className,
      )}
      onClick={() => {
        if (modalRef && modalRef.current) {
          modalRef.current.toggleVisibility();
        }
      }}
    >
      {title}
    </button>
  );
};
