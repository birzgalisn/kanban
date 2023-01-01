import React from "react";

import { SolidBackground } from "../solidBackground";

export const Container: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <SolidBackground>
      <main className="mx-auto flex h-full min-h-screen w-full max-w-screen-xl flex-col px-2 pt-2 lg:pt-8">
        {children}
      </main>
    </SolidBackground>
  );
};
