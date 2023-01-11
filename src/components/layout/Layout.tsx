import clsx from "clsx";
import React from "react";

export const Layout: React.FC<{
  children: React.ReactNode;
  noMargin?: boolean;
}> = ({ children, noMargin = false }) => {
  return (
    <div
      className={clsx(
        "flex h-full w-full overflow-auto",
        !noMargin && "px-6 py-6",
      )}
    >
      {children}
    </div>
  );
};
