import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

import type {
  BoardQuery,
  BoardQueryVariables,
} from "./__generated__/Board.generated";

import { Layout } from "@/components/layout";
import { LayoutWrapper } from "@/components/layoutWrapper";
import { Navbar } from "@/components/navbar";
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
  query Board($boardId: String!, $withWorkspace: Boolean!) {
    board(id: $boardId) {
      id
      title
      lists {
        ...ListPreviewFields
      }
      workspace @include(if: $withWorkspace) {
        title
      }
    }
  }
  ${LIST_PREVIEW_FIELDS}
`;

export const Board: React.FC<{}> = () => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;
  const boardId = router.query.boardId as string;
  const boardResult = useQuery<BoardQuery, BoardQueryVariables>(GET_BOARD, {
    variables: { boardId, withWorkspace: true },
    skip: !router.isReady,
  });
  const board = boardResult.data?.board;

  return (
    <LayoutWrapper>
      <Navbar
        isLoading={boardResult.loading}
        path={[
          {
            title: board?.workspace?.title,
            url: `/workspaces/${workspaceId}`,
          },
          {
            title: board?.title,
            url: `/workspaces/${workspaceId}/boards/${boardId}`,
          },
        ]}
      />
      <Layout>
        <Lists lists={board?.lists} />
      </Layout>
    </LayoutWrapper>
  );
};
