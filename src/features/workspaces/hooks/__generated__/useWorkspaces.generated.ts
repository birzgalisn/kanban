import * as Types from "../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type WorkspacePreviewFieldsFragment = {
  __typename?: "Workspace";
  id: string;
  title: string;
  members: Array<{
    __typename?: "Member";
    id: string;
    user: { __typename?: "User"; image?: string | null };
  }>;
};

export type WorkspacesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type WorkspacesQuery = {
  __typename?: "Query";
  workspaces?: Array<{
    __typename?: "Workspace";
    id: string;
    title: string;
    members: Array<{
      __typename?: "Member";
      id: string;
      user: { __typename?: "User"; image?: string | null };
    }>;
  }> | null;
};

export const WorkspacePreviewFieldsFragmentDoc = gql`
  fragment WorkspacePreviewFields on Workspace {
    id
    title
    members {
      id
      user {
        image
      }
    }
  }
`;
export const WorkspacesDocument = gql`
  query Workspaces {
    workspaces {
      ...WorkspacePreviewFields
    }
  }
  ${WorkspacePreviewFieldsFragmentDoc}
`;
export type WorkspacesQueryResult = Apollo.QueryResult<
  WorkspacesQuery,
  WorkspacesQueryVariables
>;
