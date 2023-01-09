import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type UpdateCardMutationVariables = Types.Exact<{
  input: Types.UpdateCardInput;
  cardId: Types.Scalars["String"];
}>;

export type UpdateCardMutation = {
  __typename?: "Mutation";
  updateCard:
    | {
        __typename?: "MutationUpdateCardSuccess";
        data: { __typename?: "Card"; id: string; description?: string | null };
      }
    | { __typename?: "ZodError" };
};

export const UpdateCardDocument = gql`
  mutation UpdateCard($input: UpdateCardInput!, $cardId: String!) {
    updateCard(input: $input, cardId: $cardId) {
      ... on MutationUpdateCardSuccess {
        data {
          id
          description
        }
      }
    }
  }
`;
export type UpdateCardMutationFn = Apollo.MutationFunction<
  UpdateCardMutation,
  UpdateCardMutationVariables
>;
export type UpdateCardMutationResult =
  Apollo.MutationResult<UpdateCardMutation>;
export type UpdateCardMutationOptions = Apollo.BaseMutationOptions<
  UpdateCardMutation,
  UpdateCardMutationVariables
>;
