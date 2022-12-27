import clsx from "clsx";
import React from "react";

export const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer
      className={clsx(
        "flex h-24 w-full items-center justify-center border-t bg-white",
        className,
      )}
    >
      <p>&copy; 2022 Kanban. All rights reserved.</p>
    </footer>
  );
};
