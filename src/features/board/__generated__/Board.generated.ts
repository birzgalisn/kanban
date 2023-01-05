import * as Types from "../../../__generated__/types";

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
  id: Types.Scalars["String"];
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
  query Board($id: String!) {
    board(id: $id) {
      id
      title
      lists {
        ...ListPreviewFields
      }
    }
  }
  ${ListPreviewFieldsFragmentDoc}
`;
export type BoardQueryResult = Apollo.QueryResult<
  BoardQuery,
  BoardQueryVariables
>;
