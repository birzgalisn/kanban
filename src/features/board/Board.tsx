import React from "react";

import { useBoard } from "./hooks";

import { Layout } from "@/components/layout";
import { LayoutWrapper } from "@/components/layoutWrapper";
import { Navbar } from "@/components/navbar";
import { Lists } from "./components/lists";

export const Board: React.FC<{}> = () => {
  const boardQuery = useBoard();
  const board = boardQuery.data?.board;

  return (
    <LayoutWrapper>
      <Navbar
        isLoading={boardQuery.loading}
        path={[
          {
            title: board?.workspace?.title,
            url: `/workspaces/${board?.workspace?.id}`,
          },
          {
            title: board?.title,
            url: `/workspaces/${board?.workspace?.id}/boards/${board?.id}`,
          },
        ]}
      />
      <Layout>
        <Lists lists={board?.lists} />
      </Layout>
    </LayoutWrapper>
  );
};
