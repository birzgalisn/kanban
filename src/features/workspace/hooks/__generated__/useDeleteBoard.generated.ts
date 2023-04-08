import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type DeleteBoardMutationVariables = Types.Exact<{
  boardId: Types.Scalars['String'];
}>;

export type DeleteBoardMutation = {
  __typename?: 'Mutation';
  deleteBoard: { __typename?: 'Board'; id: string };
};

export const DeleteBoardDocument = gql`
  mutation DeleteBoard($boardId: String!) {
    deleteBoard(boardId: $boardId) {
      id
    }
  }
`;
export type DeleteBoardMutationFn = Apollo.MutationFunction<
  DeleteBoardMutation,
  DeleteBoardMutationVariables
>;
export type DeleteBoardMutationResult = Apollo.MutationResult<DeleteBoardMutation>;
export type DeleteBoardMutationOptions = Apollo.BaseMutationOptions<
  DeleteBoardMutation,
  DeleteBoardMutationVariables
>;
