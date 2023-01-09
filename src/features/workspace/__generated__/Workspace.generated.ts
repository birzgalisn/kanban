import * as Types from "../../../__generated__/types";

import { gql } from "@apollo/client";
import { WorkspacePreviewFieldsFragmentDoc } from "../../workspaces/__generated__/Workspaces.generated";
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

export type CreateBoardMutationVariables = Types.Exact<{
  input: Types.CreateBoardInput;
  workspaceId: Types.Scalars["String"];
}>;

export type CreateBoardMutation = {
  __typename?: "Mutation";
  createBoard:
    | {
        __typename?: "MutationCreateBoardSuccess";
        data: { __typename?: "Board"; id: string; title: string };
      }
    | { __typename?: "ZodError" };
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
export const CreateBoardDocument = gql`
  mutation CreateBoard($input: CreateBoardInput!, $workspaceId: String!) {
    createBoard(input: $input, workspaceId: $workspaceId) {
      ... on MutationCreateBoardSuccess {
        data {
          ...BoardPreviewFields
        }
      }
    }
  }
  ${BoardPreviewFieldsFragmentDoc}
`;
export type CreateBoardMutationFn = Apollo.MutationFunction<
  CreateBoardMutation,
  CreateBoardMutationVariables
>;
export type CreateBoardMutationResult =
  Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<
  CreateBoardMutation,
  CreateBoardMutationVariables
>;
