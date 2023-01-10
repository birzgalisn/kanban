import * as Types from "../../../../__generated__/types";

import { gql } from "@apollo/client";
import { WorkspacePreviewFieldsFragmentDoc } from "../../../workspaces/hooks/__generated__/useWorkspaces.generated";
import * as Apollo from "@apollo/client";
export type BoardPreviewFieldsFragment = {
  __typename?: "Board";
  id: string;
  title: string;
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
    boards: Array<{ __typename?: "Board"; id: string; title: string }>;
    members: Array<{
      __typename?: "Member";
      id: string;
      user: { __typename?: "User"; image?: string | null };
    }>;
  };
};

export const BoardPreviewFieldsFragmentDoc = gql`
  fragment BoardPreviewFields on Board {
    id
    title
  }
`;
export const WorkspaceDocument = gql`
  query Workspace($workspaceId: String!) {
    workspace(id: $workspaceId) {
      ...WorkspacePreviewFields
      boards {
        ...BoardPreviewFields
      }
    }
  }
  ${WorkspacePreviewFieldsFragmentDoc}
  ${BoardPreviewFieldsFragmentDoc}
`;
export type WorkspaceQueryResult = Apollo.QueryResult<
  WorkspaceQuery,
  WorkspaceQueryVariables
>;
