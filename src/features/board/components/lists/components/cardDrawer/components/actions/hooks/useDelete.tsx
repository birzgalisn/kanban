import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

import { GET_BOARD } from "@/features/board/hooks";

import type { DrawerHandle } from "@/components/drawer";
import type {
  BoardQuery,
  BoardQueryVariables,
} from "@/features/board/hooks/__generated__/useBoard.generated";
import type {
  DeleteCardMutation,
  DeleteCardMutationVariables,
} from "./__generated__/useDelete.generated";

export type UseDeleteProps = {
  drawerRef: React.RefObject<DrawerHandle>;
};

export function useDelete({ drawerRef }: UseDeleteProps) {
  const router = useRouter();
  const boardId = router.query.boardId as string;

  const [deleteCard] = useMutation<
    DeleteCardMutation,
    DeleteCardMutationVariables
  >(
    gql`
      mutation DeleteCard($id: String!) {
        deleteCard(id: $id) {
          ... on MutationDeleteCardSuccess {
            data {
              id
            }
          }
        }
      }
    `,
  );

  return (variables: DeleteCardMutationVariables) =>
    deleteCard({
      variables,
      optimisticResponse: {
        deleteCard: {
          data: { id: variables.id },
        },
      },
      update(cache, { data }) {
        const deletedCard = data?.deleteCard;

        if (deletedCard?.__typename !== "MutationDeleteCardSuccess") return;

        const existingBoard = cache.readQuery<BoardQuery, BoardQueryVariables>({
          query: GET_BOARD,
          variables: { boardId, withWorkspace: false },
        })?.board;

        if (!existingBoard) return;

        const activeList = existingBoard.lists?.find((l) => {
          const hasCard = l.cards.some((c) => c.id === deletedCard.data.id);
          if (hasCard) return l;
        });

        if (!activeList) return;

        const updatedLists = existingBoard.lists.map((list) => {
          if (list.id === activeList.id) {
            return {
              ...list,
              cards: list.cards.filter((c) => c.id !== deletedCard.data.id),
            };
          }
          return list;
        });

        cache.writeQuery<BoardQuery, BoardQueryVariables>({
          query: GET_BOARD,
          variables: { boardId, withWorkspace: false },
          data: {
            board: {
              ...existingBoard,
              lists: updatedLists,
            },
          },
        });
      },
      onCompleted() {
        if (drawerRef.current) {
          drawerRef.current.toggleVisibility();
        }
      },
    });
}
