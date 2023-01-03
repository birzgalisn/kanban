import * as Types from "../../../__generated__/types";

import { gql } from "@apollo/client";
import { WorkspacePreviewFieldsFragmentDoc } from "../../workspaces/__generated__/Workspaces.generated";
import * as Apollo from "@apollo/client";
export type WorkspaceQueryVariables = Types.Exact<{
  id: Types.Scalars["String"];
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

export const WorkspaceDocument = gql`
  query Workspace($id: String!) {
    workspace(id: $id) {
      ...WorkspacePreviewFields
      boards {
        id
        title
      }
    }
  }
  ${WorkspacePreviewFieldsFragmentDoc}
`;
export type WorkspaceQueryResult = Apollo.QueryResult<
  WorkspaceQuery,
  WorkspaceQueryVariables
>;
