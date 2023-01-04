import clsx from "clsx";
import React from "react";

export const Bar: React.FC<{
  title: string;
  subtitle?: string;
  action?: React.ReactElement;
  children: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, action, children, className }) => {
  return (
    <div className={clsx("flex flex-col", className)}>
      <div className="mb-6 flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && (
            <p className="mt-2 font-semibold text-gray-900">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
};
