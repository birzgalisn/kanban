import React from "react";

export const ListsWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="flex h-full flex-row gap-4">{children}</div>;
};
