import React from "react";

export const GreetingModal: React.FC<{
  title: string;
  subtitle: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => {
  return (
    <div className="mx-auto flex w-full max-w-screen-xs">
      <div className="my-auto flex w-full flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex w-full flex-col">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 font-semibold text-gray-900">{subtitle}</p>
        </div>
        <div className="flex h-full flex-col gap-4 px-8">{children}</div>
      </div>
    </div>
  );
};
