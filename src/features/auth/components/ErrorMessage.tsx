import React from 'react';

export const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
  if (!message) return <></>;

  return (
    <div className="flex h-12 w-full items-center justify-center rounded-lg border border-red-300 bg-red-50">
      <p className="text-red-500">{message}</p>
    </div>
  );
};
