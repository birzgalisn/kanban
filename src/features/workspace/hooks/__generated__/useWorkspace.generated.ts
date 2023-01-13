import * as Types from "../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type BoardPreviewFieldsFragment = {
  __typename?: "Board";
  id: string;
  title: string;
  totalLists: number;
  totalCards: number;
  createdAt: any;
};

export type WorkspaceQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars["String"];
}>;

export type WorkspaceQuery = {
  __typename?: "Query";
  workspace: {
    __typename?: "Workspace";
    id: string;
    title: string;
    boards: Array<{
      __typename?: "Board";
      id: string;
      title: string;
      totalLists: number;
      totalCards: number;
      createdAt: any;
    }>;
  };
};

export const BoardPreviewFieldsFragmentDoc = gql`
  fragment BoardPreviewFields on Board {
    id
    title
    totalLists
    totalCards
    createdAt
  }
`;
export const WorkspaceDocument = gql`
  query Workspace($workspaceId: String!) {
    workspace(id: $workspaceId) {
      id
      title
      boards {
        ...BoardPreviewFields
      }
    }
  }
  ${BoardPreviewFieldsFragmentDoc}
`;
export type WorkspaceQueryResult = Apollo.QueryResult<
  WorkspaceQuery,
  WorkspaceQueryVariables
>;
