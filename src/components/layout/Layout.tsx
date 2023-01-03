import clsx from "clsx";
import React from "react";

import { Navbar } from "../navbar";
import { SolidBackground } from "../solidBackground";

export const Layout: React.FC<{
  noMargin?: boolean;
  children: React.ReactNode;
}> = ({ noMargin = false, children }) => {
  return (
    <SolidBackground>
      <main className="flex h-full min-h-screen w-full flex-col">
        <Navbar />
        <div className={clsx("flex h-full flex-col", !noMargin && "mx-6 mt-6")}>
          {children}
        </div>
      </main>
    </SolidBackground>
  );
};
