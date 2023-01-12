import React from "react";

export const WorkspaceMembersWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col divide-y divide-gray-100">
        {children}
      </div>
    </div>
  );
};
