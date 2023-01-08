import React from "react";

export const Divider: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="flex w-full flex-row items-center border-gray-200">
      <span className="h-0 w-full flex-1 border-t border-inherit" />
      {text && <span className="mx-4 text-center text-gray-400">{text}</span>}
      <span className="h-0 w-full flex-1 border-t border-inherit" />
    </div>
  );
};
