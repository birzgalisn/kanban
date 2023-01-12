import * as Types from "../../../../../../__generated__/types";

import { gql } from "@apollo/client";
import { MemberPreviewFieldsFragmentDoc } from "../../../../hooks/__generated__/useMembers.generated";
import * as Apollo from "@apollo/client";
export type AddMemberMutationVariables = Types.Exact<{
  input: Types.AddMemberInput;
  workspaceId: Types.Scalars["String"];
}>;

export type AddMemberMutation = {
  __typename?: "Mutation";
  addMember:
    | {
        __typename?: "MutationAddMemberSuccess";
        data: {
          __typename?: "Member";
          id: string;
          isOwner: boolean;
          createdAt: any;
          user: {
            __typename?: "User";
            id: string;
            email?: string | null;
            name?: string | null;
            image?: string | null;
          };
        };
      }
    | {
        __typename?: "ZodError";
        fieldErrors: Array<{
          __typename?: "ZodFieldError";
          path: Array<string>;
          message: string;
        }>;
      };
};

export const AddMemberDocument = gql`
  mutation AddMember($input: AddMemberInput!, $workspaceId: String!) {
    addMember(input: $input, workspaceId: $workspaceId) {
      ... on MutationAddMemberSuccess {
        data {
          ...MemberPreviewFields
        }
      }
      ... on ZodError {
        fieldErrors {
          path
          message
        }
      }
    }
  }
  ${MemberPreviewFieldsFragmentDoc}
`;
export type AddMemberMutationFn = Apollo.MutationFunction<
  AddMemberMutation,
  AddMemberMutationVariables
>;
export type AddMemberMutationResult = Apollo.MutationResult<AddMemberMutation>;
export type AddMemberMutationOptions = Apollo.BaseMutationOptions<
  AddMemberMutation,
  AddMemberMutationVariables
>;
