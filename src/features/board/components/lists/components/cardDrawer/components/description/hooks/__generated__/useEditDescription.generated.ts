import * as Types from '../../../../../../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type EditCardDescriptionMutationVariables = Types.Exact<{
  input: Types.EditCardDescriptionInput;
  cardId: Types.Scalars['String'];
}>;

export type EditCardDescriptionMutation = {
  __typename?: 'Mutation';
  editCardDescription:
    | {
        __typename?: 'MutationEditCardDescriptionSuccess';
        data: { __typename?: 'Card'; id: string; description?: string | null };
      }
    | { __typename?: 'ZodError' };
};

export const EditCardDescriptionDocument = gql`
  mutation EditCardDescription($input: EditCardDescriptionInput!, $cardId: String!) {
    editCardDescription(input: $input, cardId: $cardId) {
      ... on MutationEditCardDescriptionSuccess {
        data {
          id
          description
        }
      }
    }
  }
`;
export type EditCardDescriptionMutationFn = Apollo.MutationFunction<
  EditCardDescriptionMutation,
  EditCardDescriptionMutationVariables
>;
export type EditCardDescriptionMutationResult = Apollo.MutationResult<EditCardDescriptionMutation>;
export type EditCardDescriptionMutationOptions = Apollo.BaseMutationOptions<
  EditCardDescriptionMutation,
  EditCardDescriptionMutationVariables
>;
