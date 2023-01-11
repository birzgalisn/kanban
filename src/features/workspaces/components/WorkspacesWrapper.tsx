import React from "react";

export const WorkspacesWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col">
      {children}
    </div>
  );
};
