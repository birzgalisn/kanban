import * as Types from "../../../__generated__/types";

import { gql } from "@apollo/client";
import { WorkspacePreviewMembersFragmentDoc } from "../../../features/workspaces/__generated__/Workspaces.generated";
import * as Apollo from "@apollo/client";
export type WorkspaceMembersQueryVariables = Types.Exact<{
  id: Types.Scalars["String"];
}>;

export type WorkspaceMembersQuery = {
  __typename?: "Query";
  workspace: {
    __typename?: "Workspace";
    members: Array<{
      __typename?: "Member";
      id: string;
      user: { __typename?: "User"; image?: string | null };
    }>;
  };
};

export const WorkspaceMembersDocument = gql`
  query WorkspaceMembers($id: String!) {
    workspace(id: $id) {
      ...WorkspacePreviewMembers
    }
  }
  ${WorkspacePreviewMembersFragmentDoc}
`;
export type WorkspaceMembersQueryResult = Apollo.QueryResult<
  WorkspaceMembersQuery,
  WorkspaceMembersQueryVariables
>;
