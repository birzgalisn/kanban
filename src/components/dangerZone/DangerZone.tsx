import React from "react";

export const DangerZone: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Danger zone</h2>
      <div className="mb-4 flex h-full w-full flex-col items-center rounded-lg border border-red-500">
        {children}
      </div>
    </div>
  );
};
