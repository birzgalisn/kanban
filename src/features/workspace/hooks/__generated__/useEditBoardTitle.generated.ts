import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type EditBoardTitleMutationVariables = Types.Exact<{
  input: Types.EditBoardTitleInput;
  boardId: Types.Scalars['String'];
}>;

export type EditBoardTitleMutation = {
  __typename?: 'Mutation';
  editBoardTitle:
    | {
        __typename?: 'MutationEditBoardTitleSuccess';
        data: { __typename?: 'Board'; id: string; title: string };
      }
    | { __typename?: 'ZodError' };
};

export const EditBoardTitleDocument = gql`
  mutation EditBoardTitle($input: EditBoardTitleInput!, $boardId: String!) {
    editBoardTitle(input: $input, boardId: $boardId) {
      ... on MutationEditBoardTitleSuccess {
        data {
          id
          title
        }
      }
    }
  }
`;
export type EditBoardTitleMutationFn = Apollo.MutationFunction<
  EditBoardTitleMutation,
  EditBoardTitleMutationVariables
>;
export type EditBoardTitleMutationResult = Apollo.MutationResult<EditBoardTitleMutation>;
export type EditBoardTitleMutationOptions = Apollo.BaseMutationOptions<
  EditBoardTitleMutation,
  EditBoardTitleMutationVariables
>;
