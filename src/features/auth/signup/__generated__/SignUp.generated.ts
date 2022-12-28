import * as Types from "../../../../__generated__/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type CreateUserMutationVariables = Types.Exact<{
  input: Types.CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser:
    | {
        __typename?: "MutationCreateUserSuccess";
        data: { __typename?: "User"; id: string };
      }
    | {
        __typename?: "ZodError";
        fieldErrors: Array<{
          __typename?: "ZodFieldError";
          message: string;
          path: Array<string>;
        }>;
      };
};

export const CreateUserDocument = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ... on MutationCreateUserSuccess {
        data {
          id
        }
      }
      ... on ZodError {
        fieldErrors {
          message
          path
        }
      }
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
