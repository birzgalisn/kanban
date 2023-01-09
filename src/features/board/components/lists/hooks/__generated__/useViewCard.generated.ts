import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type CardQueryVariables = Types.Exact<{
  id: Types.Scalars["String"];
}>;

export type CardQuery = {
  __typename?: "Query";
  card: {
    __typename?: "Card";
    id: string;
    title: string;
    description?: string | null;
  };
};

export const CardDocument = gql`
  query Card($id: String!) {
    card(id: $id) {
      id
      title
      description
    }
  }
`;
export type CardQueryResult = Apollo.QueryResult<CardQuery, CardQueryVariables>;
