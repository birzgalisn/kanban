import React from "react";

import { Navbar } from "../navbar";
import { SolidBackground } from "../solidBackground";

export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <SolidBackground>
      <main className="flex h-full min-h-screen w-full flex-col">
        <Navbar />
        <div className="mx-6 mt-6 flex h-full flex-col">{children}</div>
      </main>
    </SolidBackground>
  );
};
