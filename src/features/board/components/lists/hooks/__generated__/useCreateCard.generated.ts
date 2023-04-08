import * as Types from '../../../../../../__generated__/types';

import { gql } from '@apollo/client';
import { CardPreviewFieldsFragmentDoc } from '../../../../hooks/__generated__/useBoard.generated';
import * as Apollo from '@apollo/client';
export type CreateCardMutationVariables = Types.Exact<{
  input: Types.CreateCardInput;
  listId: Types.Scalars['String'];
}>;

export type CreateCardMutation = {
  __typename?: 'Mutation';
  createCard:
    | {
        __typename?: 'MutationCreateCardSuccess';
        data: { __typename?: 'Card'; id: string; title: string; listId: string };
      }
    | { __typename?: 'ZodError' };
};

export const CreateCardDocument = gql`
  mutation CreateCard($input: CreateCardInput!, $listId: String!) {
    createCard(input: $input, listId: $listId) {
      ... on MutationCreateCardSuccess {
        data {
          ...CardPreviewFields
        }
      }
    }
  }
  ${CardPreviewFieldsFragmentDoc}
`;
export type CreateCardMutationFn = Apollo.MutationFunction<
  CreateCardMutation,
  CreateCardMutationVariables
>;
export type CreateCardMutationResult = Apollo.MutationResult<CreateCardMutation>;
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<
  CreateCardMutation,
  CreateCardMutationVariables
>;
