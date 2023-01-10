import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import type {
  BoardQuery,
  BoardQueryVariables,
} from "./__generated__/useBoard.generated";

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
        id
        title
      }
    }
  }
  ${LIST_PREVIEW_FIELDS}
`;

export function useBoard() {
  const router = useRouter();
  const boardId = router.query.boardId as string;

  const boardResult = useQuery<BoardQuery, BoardQueryVariables>(GET_BOARD, {
    variables: { boardId, withWorkspace: true },
    skip: !router.isReady,
  });

  return boardResult;
}
