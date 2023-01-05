import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

import type {
  BoardQuery,
  BoardQueryVariables,
} from "./__generated__/Board.generated";

import { WorkspaceLayout } from "@/components/workspaceLayout";
import { Lists } from "./components/lists";

export const CARD_PREVIEW_FIELDS = gql`
  fragment CardPreviewFields on Card {
    id
    title
    listId
  }
`;

export const LIST_PREVIEW_FIELDS = gql`
  fragment ListPreviewFields on List {
    id
    title
    cards {
      ...CardPreviewFields
    }
  }
  ${CARD_PREVIEW_FIELDS}
`;

export const GET_BOARD = gql`
  query Board($id: String!) {
    board(id: $id) {
      id
      title
      lists {
        ...ListPreviewFields
      }
    }
  }
  ${LIST_PREVIEW_FIELDS}
`;

export const Board: React.FC<{}> = () => {
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const boardResult = useQuery<BoardQuery, BoardQueryVariables>(GET_BOARD, {
    variables: { id: boardId },
    skip: !router.isReady,
  });
  const board = boardResult.data?.board;

  return (
    <WorkspaceLayout title={board?.title} isLoading={boardResult.loading}>
      <Lists lists={board?.lists} />
    </WorkspaceLayout>
  );
};
