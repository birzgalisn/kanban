import React from "react";

export const Section: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="mb-1 flex flex-col">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col p-6">
        {children}
      </div>
    </div>
  );
};
