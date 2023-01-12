import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type RemoveMemberMutationVariables = Types.Exact<{
  memberId: Types.Scalars["String"];
}>;

export type RemoveMemberMutation = {
  __typename?: "Mutation";
  removeMember:
    | {
        __typename?: "MutationRemoveMemberSuccess";
        data: { __typename?: "Member"; id: string };
      }
    | { __typename?: "ZodError" };
};

export const RemoveMemberDocument = gql`
  mutation RemoveMember($memberId: String!) {
    removeMember(memberId: $memberId) {
      ... on MutationRemoveMemberSuccess {
        data {
          id
        }
      }
    }
  }
`;
export type RemoveMemberMutationFn = Apollo.MutationFunction<
  RemoveMemberMutation,
  RemoveMemberMutationVariables
>;
export type RemoveMemberMutationResult =
  Apollo.MutationResult<RemoveMemberMutation>;
export type RemoveMemberMutationOptions = Apollo.BaseMutationOptions<
  RemoveMemberMutation,
  RemoveMemberMutationVariables
>;
