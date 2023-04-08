import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type DeleteMeMutationVariables = Types.Exact<{ [key: string]: never }>;

export type DeleteMeMutation = {
  __typename?: 'Mutation';
  deleteMe: { __typename?: 'User'; id: string };
};

export const DeleteMeDocument = gql`
  mutation DeleteMe {
    deleteMe {
      id
    }
  }
`;
export type DeleteMeMutationFn = Apollo.MutationFunction<
  DeleteMeMutation,
  DeleteMeMutationVariables
>;
export type DeleteMeMutationResult = Apollo.MutationResult<DeleteMeMutation>;
export type DeleteMeMutationOptions = Apollo.BaseMutationOptions<
  DeleteMeMutation,
  DeleteMeMutationVariables
>;
