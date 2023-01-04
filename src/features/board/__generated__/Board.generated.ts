import * as Types from "../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type BoardQueryVariables = Types.Exact<{
  id: Types.Scalars["String"];
}>;

export type BoardQuery = {
  __typename?: "Query";
  board: {
    __typename?: "Board";
    id: string;
    title: string;
    lists: Array<{ __typename?: "List"; id: string; title: string }>;
  };
};

export const BoardDocument = gql`
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
`;
export type BoardQueryResult = Apollo.QueryResult<
  BoardQuery,
  BoardQueryVariables
>;
