import React from "react";

import { Layout } from "@/components/layout";
import { WorkspaceNavbar } from "@/components/workspaceNavbar";

export const Board: React.FC<{}> = () => {
  return (
    <Layout noMargin>
      <WorkspaceNavbar isLoading={true} />
    </Layout>
  );
};
