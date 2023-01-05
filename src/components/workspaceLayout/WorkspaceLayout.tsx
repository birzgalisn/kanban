import clsx from "clsx";
import React from "react";

import type { WorkspaceQuery } from "@/features/workspace/__generated__/Workspace.generated";
export type Members = WorkspaceQuery["workspace"]["members"];

import { Layout } from "../layout";
import { WorkspaceNavbar } from "../workspaceNavbar";

export const WorkspaceLayout: React.FC<{
  isLoading: boolean;
  title?: string;
  members?: Members;
  children: React.ReactNode;
  noMargin?: boolean;
}> = ({ isLoading, title, members, children, noMargin = false }) => {
  return (
    <Layout noMargin>
      <WorkspaceNavbar isLoading={isLoading} title={title} members={members} />
      <div
        className={clsx("flex h-[calc(100vh-8rem)] w-full", !noMargin && "p-6")}
      >
        {children}
      </div>
    </Layout>
  );
};
