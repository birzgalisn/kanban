import * as Types from "../../../../__generated__/types";

import { gql } from "@apollo/client";
import { WorkspacePreviewFieldsFragmentDoc } from "./useWorkspaces.generated";
import * as Apollo from "@apollo/client";
export type CreateWorkspaceMutationVariables = Types.Exact<{
  input: Types.CreateWorkspaceInput;
}>;

export type CreateWorkspaceMutation = {
  __typename?: "Mutation";
  createWorkspace:
    | {
        __typename?: "MutationCreateWorkspaceSuccess";
        data: {
          __typename?: "Workspace";
          id: string;
          title: string;
          members: Array<{
            __typename?: "Member";
            id: string;
            user: { __typename?: "User"; image?: string | null };
          }>;
        };
      }
    | { __typename?: "ZodError" };
};

export const CreateWorkspaceDocument = gql`
  mutation CreateWorkspace($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) {
      ... on MutationCreateWorkspaceSuccess {
        data {
          ...WorkspacePreviewFields
        }
      }
    }
  }
  ${WorkspacePreviewFieldsFragmentDoc}
`;
export type CreateWorkspaceMutationFn = Apollo.MutationFunction<
  CreateWorkspaceMutation,
  CreateWorkspaceMutationVariables
>;
export type CreateWorkspaceMutationResult =
  Apollo.MutationResult<CreateWorkspaceMutation>;
export type CreateWorkspaceMutationOptions = Apollo.BaseMutationOptions<
  CreateWorkspaceMutation,
  CreateWorkspaceMutationVariables
>;
