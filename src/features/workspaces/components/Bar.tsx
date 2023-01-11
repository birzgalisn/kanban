import React from "react";

export const Bar: React.FC<{
  title: string;
  subtitle?: string;
  action?: React.ReactElement;
}> = ({ title, subtitle, action }) => {
  return (
    <div className="mb-6 flex justify-between">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-2 font-semibold text-gray-900">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
};
