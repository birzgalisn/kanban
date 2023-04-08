import React from 'react';

export const SolidBackground: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="absolute w-full bg-gradient-to-br from-green-50 to-blue-50">
      <div className="relative overflow-x-hidden bg-white/95 backdrop-blur-xl">{children}</div>
    </div>
  );
};
