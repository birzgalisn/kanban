import clsx from "clsx";
import React from "react";

export const Container: React.FC<{
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ className, children, footer }) => {
  return (
    <div className="absolute w-full bg-gradient-to-br from-kanban-green to-kanban-blue">
      <div className="relative flex flex-col overflow-x-hidden bg-white/95 backdrop-blur-xl">
        <main
          className={clsx(
            "mx-auto flex h-full min-h-screen w-full max-w-screen-xl flex-col px-2 pt-2 lg:pt-8",
            className,
          )}
        >
          {children}
        </main>
        {footer}
      </div>
    </div>
  );
};
