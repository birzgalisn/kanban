import * as Types from "../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type CardPreviewFieldsFragment = {
  __typename?: "Card";
  id: string;
  title: string;
  listId: string;
};

export type ListPreviewFieldsFragment = {
  __typename?: "List";
  id: string;
  title: string;
  cards: Array<{
    __typename?: "Card";
    id: string;
    title: string;
    listId: string;
  }>;
};

export type BoardQueryVariables = Types.Exact<{
  boardId: Types.Scalars["String"];
  withWorkspace: Types.Scalars["Boolean"];
}>;

export type BoardQuery = {
  __typename?: "Query";
  board: {
    __typename?: "Board";
    id: string;
    title: string;
    lists: Array<{
      __typename?: "List";
      id: string;
      title: string;
      cards: Array<{
        __typename?: "Card";
        id: string;
        title: string;
        listId: string;
      }>;
    }>;
    workspace?: { __typename?: "Workspace"; id: string; title: string };
  };
};

export const CardPreviewFieldsFragmentDoc = gql`
  fragment CardPreviewFields on Card {
    id
    title
    listId
  }
`;
export const ListPreviewFieldsFragmentDoc = gql`
  fragment ListPreviewFields on List {
    id
    title
    cards {
      ...CardPreviewFields
    }
  }
  ${CardPreviewFieldsFragmentDoc}
`;
export const BoardDocument = gql`
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
  ${ListPreviewFieldsFragmentDoc}
`;
export type BoardQueryResult = Apollo.QueryResult<
  BoardQuery,
  BoardQueryVariables
>;
