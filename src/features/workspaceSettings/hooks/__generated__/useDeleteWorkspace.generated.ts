import * as Types from "../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type DeleteWorkspaceMutationVariables = Types.Exact<{
  workspaceId: Types.Scalars["String"];
}>;

export type DeleteWorkspaceMutation = {
  __typename?: "Mutation";
  deleteWorkspace: { __typename?: "Workspace"; id: string };
};

export const DeleteWorkspaceDocument = gql`
  mutation DeleteWorkspace($workspaceId: String!) {
    deleteWorkspace(workspaceId: $workspaceId) {
      id
    }
  }
`;
export type DeleteWorkspaceMutationFn = Apollo.MutationFunction<
  DeleteWorkspaceMutation,
  DeleteWorkspaceMutationVariables
>;
export type DeleteWorkspaceMutationResult =
  Apollo.MutationResult<DeleteWorkspaceMutation>;
export type DeleteWorkspaceMutationOptions = Apollo.BaseMutationOptions<
  DeleteWorkspaceMutation,
  DeleteWorkspaceMutationVariables
>;
