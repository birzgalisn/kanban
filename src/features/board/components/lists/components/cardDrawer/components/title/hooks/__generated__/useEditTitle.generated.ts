import * as Types from "../../../../../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type EditCardTitleMutationVariables = Types.Exact<{
  input: Types.EditCardTitleInput;
  cardId: Types.Scalars["String"];
}>;

export type EditCardTitleMutation = {
  __typename?: "Mutation";
  editCardTitle:
    | {
        __typename?: "MutationEditCardTitleSuccess";
        data: { __typename?: "Card"; id: string; title: string };
      }
    | { __typename?: "ZodError" };
};

export const EditCardTitleDocument = gql`
  mutation EditCardTitle($input: EditCardTitleInput!, $cardId: String!) {
    editCardTitle(input: $input, cardId: $cardId) {
      ... on MutationEditCardTitleSuccess {
        data {
          id
          title
        }
      }
    }
  }
`;
export type EditCardTitleMutationFn = Apollo.MutationFunction<
  EditCardTitleMutation,
  EditCardTitleMutationVariables
>;
export type EditCardTitleMutationResult =
  Apollo.MutationResult<EditCardTitleMutation>;
export type EditCardTitleMutationOptions = Apollo.BaseMutationOptions<
  EditCardTitleMutation,
  EditCardTitleMutationVariables
>;
