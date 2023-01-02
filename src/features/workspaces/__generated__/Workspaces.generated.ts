import * as Types from "../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
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

export const WorkspacesDocument = gql`
  query Workspaces {
    workspaces {
      id
      title
      members {
        id
        user {
          image
        }
      }
    }
  }
`;
export type WorkspacesQueryResult = Apollo.QueryResult<
  WorkspacesQuery,
  WorkspacesQueryVariables
>;
export const CreateWorkspaceDocument = gql`
  mutation CreateWorkspace($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) {
      ... on MutationCreateWorkspaceSuccess {
        data {
          id
          title
          members {
            id
            user {
              image
            }
          }
        }
      }
    }
  }
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