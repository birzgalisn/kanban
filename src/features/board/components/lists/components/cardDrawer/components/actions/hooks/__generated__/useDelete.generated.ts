import * as Types from "../../../../../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type DeleteCardMutationVariables = Types.Exact<{
  id: Types.Scalars["String"];
}>;

export type DeleteCardMutation = {
  __typename?: "Mutation";
  deleteCard:
    | {
        __typename?: "MutationDeleteCardSuccess";
        data: { __typename?: "Card"; id: string };
      }
    | { __typename?: "ZodError" };
};

export const DeleteCardDocument = gql`
  mutation DeleteCard($id: String!) {
    deleteCard(id: $id) {
      ... on MutationDeleteCardSuccess {
        data {
          id
        }
      }
    }
  }
`;
export type DeleteCardMutationFn = Apollo.MutationFunction<
  DeleteCardMutation,
  DeleteCardMutationVariables
>;
export type DeleteCardMutationResult =
  Apollo.MutationResult<DeleteCardMutation>;
export type DeleteCardMutationOptions = Apollo.BaseMutationOptions<
  DeleteCardMutation,
  DeleteCardMutationVariables
>;
