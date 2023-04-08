import React from 'react';

export const Scrollable: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="relative -left-6 w-screen">
      <div className="flex w-full gap-6 overflow-hidden overflow-x-auto pb-6 first:pl-6 last:pr-6">
        {children}
      </div>
    </div>
  );
};
