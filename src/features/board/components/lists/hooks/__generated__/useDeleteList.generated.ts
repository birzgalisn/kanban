import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type DeleteListMutationVariables = Types.Exact<{
  id: Types.Scalars["String"];
}>;

export type DeleteListMutation = {
  __typename?: "Mutation";
  deleteList: { __typename?: "List"; id: string };
};

export const DeleteListDocument = gql`
  mutation DeleteList($id: String!) {
    deleteList(id: $id) {
      id
    }
  }
`;
export type DeleteListMutationFn = Apollo.MutationFunction<
  DeleteListMutation,
  DeleteListMutationVariables
>;
export type DeleteListMutationResult =
  Apollo.MutationResult<DeleteListMutation>;
export type DeleteListMutationOptions = Apollo.BaseMutationOptions<
  DeleteListMutation,
  DeleteListMutationVariables
>;
