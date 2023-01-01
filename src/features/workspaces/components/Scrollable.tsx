import React from "react";

export const Scrollable: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="relative -left-6 -right-6">
      <div className="absolute flex w-screen gap-6 overflow-x-scroll pb-6 first:pl-6 last:pr-6">
        {children}
      </div>
    </div>
  );
};
