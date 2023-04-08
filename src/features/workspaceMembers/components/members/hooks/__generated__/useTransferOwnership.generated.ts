import * as Types from '../../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type TransferOwnershipMutationVariables = Types.Exact<{
  memberId: Types.Scalars['String'];
}>;

export type TransferOwnershipMutation = {
  __typename?: 'Mutation';
  transferOwnership:
    | {
        __typename?: 'MutationTransferOwnershipSuccess';
        data: { __typename?: 'Member'; id: string };
      }
    | { __typename?: 'ZodError' };
};

export const TransferOwnershipDocument = gql`
  mutation TransferOwnership($memberId: String!) {
    transferOwnership(memberId: $memberId) {
      ... on MutationTransferOwnershipSuccess {
        data {
          id
        }
      }
    }
  }
`;
export type TransferOwnershipMutationFn = Apollo.MutationFunction<
  TransferOwnershipMutation,
  TransferOwnershipMutationVariables
>;
export type TransferOwnershipMutationResult = Apollo.MutationResult<TransferOwnershipMutation>;
export type TransferOwnershipMutationOptions = Apollo.BaseMutationOptions<
  TransferOwnershipMutation,
  TransferOwnershipMutationVariables
>;
