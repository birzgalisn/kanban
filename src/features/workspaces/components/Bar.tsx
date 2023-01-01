import React from "react";

export const Bar: React.FC<{
  title: string;
  subtitle?: string;
  action?: React.ReactElement;
  children: React.ReactNode;
}> = ({ title, subtitle, action, children }) => {
  return (
    <div className="flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && (
            <p className="font-semibold text-gray-900">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
};
