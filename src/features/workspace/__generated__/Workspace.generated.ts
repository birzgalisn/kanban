import * as Types from "../../../__generated__/types";

import { gql } from "@apollo/client";
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

export const WorkspaceDocument = gql`
  query Workspace($id: String!) {
    workspace(id: $id) {
      id
      title
      boards {
        id
        title
      }
    }
  }
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
          id
          title
        }
      }
    }
  }
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
