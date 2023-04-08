import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

import { GET_BOARD } from '@/features/board/hooks';
import { GET_WORKSPACE } from '@/features/workspace/hooks';

import type { DrawerHandle } from '@/components/drawer';
import type {
  BoardQuery,
  BoardQueryVariables,
} from '@/features/board/hooks/__generated__/useBoard.generated';
import type {
  WorkspaceQuery,
  WorkspaceQueryVariables,
} from '@/features/workspace/hooks/__generated__/useWorkspace.generated';
import type {
  DeleteCardMutation,
  DeleteCardMutationVariables,
} from './__generated__/useDelete.generated';

export type UseDeleteProps = {
  drawerRef: React.RefObject<DrawerHandle>;
};

export function useDelete({ drawerRef }: UseDeleteProps) {
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const workspaceId = router.query.workspaceId as string;

  const [deleteCard] = useMutation<DeleteCardMutation, DeleteCardMutationVariables>(
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

        if (deletedCard?.__typename !== 'MutationDeleteCardSuccess') return;

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

        const existingWorkspace = cache.readQuery<WorkspaceQuery, WorkspaceQueryVariables>({
          query: GET_WORKSPACE,
          variables: { workspaceId },
        })?.workspace;

        if (!existingWorkspace) return;

        cache.writeQuery<WorkspaceQuery, WorkspaceQueryVariables>({
          query: GET_WORKSPACE,
          variables: { workspaceId },
          data: {
            workspace: {
              ...existingWorkspace,
              boards: existingWorkspace.boards.map((board) => {
                if (board.id === existingBoard.id)
                  return { ...board, totalCards: board.totalCards - 1 };
                return board;
              }),
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
