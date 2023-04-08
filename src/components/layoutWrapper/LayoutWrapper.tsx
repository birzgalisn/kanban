import React from 'react';
import { SolidBackground } from '../solidBackground';

export const LayoutWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <SolidBackground>
      <main className="flex h-screen w-screen flex-col">{children}</main>
    </SolidBackground>
  );
};
