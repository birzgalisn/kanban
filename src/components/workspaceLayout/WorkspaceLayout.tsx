import clsx from "clsx";
import React from "react";

import { Layout } from "../layout";
import { WorkspaceNavbar } from "../workspaceNavbar";

export const WorkspaceLayout: React.FC<{
  title?: string;
  isLoading: boolean;
  children: React.ReactNode;
  noMargin?: boolean;
}> = ({ title, isLoading, children, noMargin = false }) => {
  return (
    <Layout noMargin>
      <WorkspaceNavbar title={title} isLoading={isLoading} />
      <div
        className={clsx("flex h-[calc(100vh-8rem)] w-full", !noMargin && "p-6")}
      >
        {children}
      </div>
    </Layout>
  );
};
