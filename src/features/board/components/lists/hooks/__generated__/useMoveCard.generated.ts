import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type MoveCardMutationVariables = Types.Exact<{
  id: Types.Scalars["String"];
  destination: Types.Scalars["String"];
}>;

export type MoveCardMutation = {
  __typename?: "Mutation";
  moveCard: { __typename?: "Card"; id: string; listId: string };
};

export const MoveCardDocument = gql`
  mutation MoveCard($id: String!, $destination: String!) {
    moveCard(id: $id, destination: $destination) {
      id
      listId
    }
  }
`;
export type MoveCardMutationFn = Apollo.MutationFunction<
  MoveCardMutation,
  MoveCardMutationVariables
>;
export type MoveCardMutationResult = Apollo.MutationResult<MoveCardMutation>;
export type MoveCardMutationOptions = Apollo.BaseMutationOptions<
  MoveCardMutation,
  MoveCardMutationVariables
>;
