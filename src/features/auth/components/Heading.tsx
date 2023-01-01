import React from "react";

import { Logo } from "@/ui/logo";

export const Heading: React.FC<{}> = () => {
  return (
    <div className="mb-12 flex h-12 flex-row items-center gap-2 lg:mb-20">
      <Logo width={21} height={21} />
    </div>
  );
};
