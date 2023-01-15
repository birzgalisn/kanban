import * as Types from "../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id: string;
    name?: string | null;
    email?: string | null;
  };
};

export type EditMeMutationVariables = Types.Exact<{
  input: Types.EditMeNameInput;
}>;

export type EditMeMutation = {
  __typename?: "Mutation";
  editMeName:
    | {
        __typename?: "MutationEditMeNameSuccess";
        data: { __typename?: "User"; id: string; name?: string | null };
      }
    | { __typename?: "ZodError" };
};

export const MeDocument = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const EditMeDocument = gql`
  mutation EditMe($input: EditMeNameInput!) {
    editMeName(input: $input) {
      ... on MutationEditMeNameSuccess {
        data {
          id
          name
        }
      }
    }
  }
`;
export type EditMeMutationFn = Apollo.MutationFunction<
  EditMeMutation,
  EditMeMutationVariables
>;
export type EditMeMutationResult = Apollo.MutationResult<EditMeMutation>;
export type EditMeMutationOptions = Apollo.BaseMutationOptions<
  EditMeMutation,
  EditMeMutationVariables
>;
