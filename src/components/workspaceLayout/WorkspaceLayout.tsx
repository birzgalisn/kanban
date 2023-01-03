import React from "react";

export const WorkspaceLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="flex h-[calc(100vh-8rem)] w-full">{children}</div>;
};
