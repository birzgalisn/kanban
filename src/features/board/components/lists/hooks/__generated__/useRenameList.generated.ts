import * as Types from '../../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type RenameListMutationVariables = Types.Exact<{
  input: Types.RenameListInput;
  id: Types.Scalars['String'];
}>;

export type RenameListMutation = {
  __typename?: 'Mutation';
  renameList:
    | {
        __typename?: 'MutationRenameListSuccess';
        data: { __typename?: 'List'; id: string; title: string };
      }
    | { __typename?: 'ZodError' };
};

export const RenameListDocument = gql`
  mutation RenameList($input: RenameListInput!, $id: String!) {
    renameList(input: $input, id: $id) {
      ... on MutationRenameListSuccess {
        data {
          id
          title
        }
      }
    }
  }
`;
export type RenameListMutationFn = Apollo.MutationFunction<
  RenameListMutation,
  RenameListMutationVariables
>;
export type RenameListMutationResult = Apollo.MutationResult<RenameListMutation>;
export type RenameListMutationOptions = Apollo.BaseMutationOptions<
  RenameListMutation,
  RenameListMutationVariables
>;
