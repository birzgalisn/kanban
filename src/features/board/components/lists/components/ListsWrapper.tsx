import React from "react";

export const ListsWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="flex gap-6">{children}</div>;
};
