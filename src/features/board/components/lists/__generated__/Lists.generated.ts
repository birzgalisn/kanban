import * as Types from "../../../../../__generated__/types";

import { gql } from "@apollo/client";
import { CardPreviewFieldsFragmentDoc } from "../../../__generated__/Board.generated";
import { ListPreviewFieldsFragmentDoc } from "../../../__generated__/Board.generated";
import * as Apollo from "@apollo/client";
export type MoveCardMutationVariables = Types.Exact<{
  id: Types.Scalars["String"];
  destination: Types.Scalars["String"];
}>;

export type MoveCardMutation = {
  __typename?: "Mutation";
  moveCard: { __typename?: "Card"; id: string; listId: string };
};

export type CreateCardMutationVariables = Types.Exact<{
  input: Types.CreateCardInput;
  listId: Types.Scalars["String"];
}>;

export type CreateCardMutation = {
  __typename?: "Mutation";
  createCard:
    | {
        __typename?: "MutationCreateCardSuccess";
        data: {
          __typename?: "Card";
          id: string;
          title: string;
          listId: string;
        };
      }
    | { __typename?: "ZodError" };
};

export type CreateListMutationVariables = Types.Exact<{
  input: Types.CreateListInput;
  boardId: Types.Scalars["String"];
}>;

export type CreateListMutation = {
  __typename?: "Mutation";
  createList:
    | {
        __typename?: "MutationCreateListSuccess";
        data: {
          __typename?: "List";
          id: string;
          title: string;
          cards: Array<{
            __typename?: "Card";
            id: string;
            title: string;
            listId: string;
          }>;
        };
      }
    | { __typename?: "ZodError" };
};

export const MoveCardDocument = gql`
  mutation MoveCard($id: String!, $destination: String!) {
    moveCard(id: $id, destination: $destination) {
      id
      listId
    }
  }
`;
export type MoveCardMutationFn = Apollo.MutationFunction<
  MoveCardMutation,
  MoveCardMutationVariables
>;
export type MoveCardMutationResult = Apollo.MutationResult<MoveCardMutation>;
export type MoveCardMutationOptions = Apollo.BaseMutationOptions<
  MoveCardMutation,
  MoveCardMutationVariables
>;
export const CreateCardDocument = gql`
  mutation CreateCard($input: CreateCardInput!, $listId: String!) {
    createCard(input: $input, listId: $listId) {
      ... on MutationCreateCardSuccess {
        data {
          ...CardPreviewFields
        }
      }
    }
  }
  ${CardPreviewFieldsFragmentDoc}
`;
export type CreateCardMutationFn = Apollo.MutationFunction<
  CreateCardMutation,
  CreateCardMutationVariables
>;
export type CreateCardMutationResult =
  Apollo.MutationResult<CreateCardMutation>;
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<
  CreateCardMutation,
  CreateCardMutationVariables
>;
export const CreateListDocument = gql`
  mutation CreateList($input: CreateListInput!, $boardId: String!) {
    createList(input: $input, boardId: $boardId) {
      ... on MutationCreateListSuccess {
        data {
          ...ListPreviewFields
        }
      }
    }
  }
  ${ListPreviewFieldsFragmentDoc}
`;
export type CreateListMutationFn = Apollo.MutationFunction<
  CreateListMutation,
  CreateListMutationVariables
>;
export type CreateListMutationResult =
  Apollo.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = Apollo.BaseMutationOptions<
  CreateListMutation,
  CreateListMutationVariables
>;
