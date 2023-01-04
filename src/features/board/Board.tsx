import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

import type {
  BoardQuery,
  BoardQueryVariables,
} from "./__generated__/Board.generated";

import { WorkspaceLayout } from "@/components/workspaceLayout";

export const Board: React.FC<{}> = () => {
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const boardResult = useQuery<BoardQuery, BoardQueryVariables>(
    gql`
      query Board($id: String!) {
        board(id: $id) {
          id
          title
          lists {
            id
            title
          }
        }
      }
    `,
    {
      variables: {
        id: boardId,
      },
      skip: !router.isReady,
    },
  );

  const board = boardResult.data?.board;

  return (
    <WorkspaceLayout title={board?.title} isLoading={boardResult.loading}>
      <pre>{JSON.stringify(boardResult.data, null, 2)}</pre>
    </WorkspaceLayout>
  );
};
