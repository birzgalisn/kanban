import React from "react";

export const DropdownGroup: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="px-1 py-1">{children}</div>;
};
