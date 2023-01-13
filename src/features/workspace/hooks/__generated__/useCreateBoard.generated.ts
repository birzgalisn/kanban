import * as Types from "../../../../__generated__/types";

import { gql } from "@apollo/client";
import { BoardPreviewFieldsFragmentDoc } from "./useWorkspace.generated";
import * as Apollo from "@apollo/client";
export type CreateBoardMutationVariables = Types.Exact<{
  input: Types.CreateBoardInput;
  workspaceId: Types.Scalars["String"];
}>;

export type CreateBoardMutation = {
  __typename?: "Mutation";
  createBoard:
    | {
        __typename?: "MutationCreateBoardSuccess";
        data: {
          __typename?: "Board";
          id: string;
          title: string;
          totalLists: number;
          totalCards: number;
          createdAt: any;
        };
      }
    | { __typename?: "ZodError" };
};

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
