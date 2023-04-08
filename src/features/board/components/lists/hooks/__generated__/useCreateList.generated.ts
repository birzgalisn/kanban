import * as Types from '../../../../../../__generated__/types';

import { gql } from '@apollo/client';
import { ListPreviewFieldsFragmentDoc } from '../../../../hooks/__generated__/useBoard.generated';
import * as Apollo from '@apollo/client';
export type CreateListMutationVariables = Types.Exact<{
  input: Types.CreateListInput;
  boardId: Types.Scalars['String'];
}>;

export type CreateListMutation = {
  __typename?: 'Mutation';
  createList:
    | {
        __typename?: 'MutationCreateListSuccess';
        data: {
          __typename?: 'List';
          id: string;
          title: string;
          cards: Array<{ __typename?: 'Card'; id: string; title: string; listId: string }>;
        };
      }
    | { __typename?: 'ZodError' };
};

export const CreateListDocument = gql`
  mutation CreateList($input: CreateListInput!, $boardId: String!) {
    createList(input: $input, boardId: $boardId) {
      ... on MutationCreateListSuccess {
        data {
          ...ListPreviewFields
        }
      }
    }
  }
  ${ListPreviewFieldsFragmentDoc}
`;
export type CreateListMutationFn = Apollo.MutationFunction<
  CreateListMutation,
  CreateListMutationVariables
>;
export type CreateListMutationResult = Apollo.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = Apollo.BaseMutationOptions<
  CreateListMutation,
  CreateListMutationVariables
>;
