import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { GET_WORKSPACE } from './useWorkspace';

import type {
  DeleteBoardMutation,
  DeleteBoardMutationVariables,
} from './__generated__/useDeleteBoard.generated';
import type {
  WorkspaceQuery,
  WorkspaceQueryVariables,
} from './__generated__/useWorkspace.generated';

type useDeleteBoard = DeleteBoardMutationVariables;

export function useDeleteBoard() {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const [deleteBoard] = useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(
    gql`
      mutation DeleteBoard($boardId: String!) {
        deleteBoard(boardId: $boardId) {
          id
        }
      }
    `,
    {
      update(cache, { data }) {
        const deletedBoard = data?.deleteBoard;

        if (!deletedBoard) return;

        const existingWorkspace = cache.readQuery<WorkspaceQuery, WorkspaceQueryVariables>({
          query: GET_WORKSPACE,
          variables: { workspaceId },
        })?.workspace;

        if (!existingWorkspace) return;

        cache.writeQuery<WorkspaceQuery, WorkspaceQueryVariables>({
          query: GET_WORKSPACE,
          variables: {
            workspaceId,
          },
          data: {
            workspace: {
              ...existingWorkspace,
              boards: existingWorkspace.boards.filter((board) => board.id !== deletedBoard.id),
            },
          },
        });
      },
    },
  );

  return (variables: DeleteBoardMutationVariables) =>
    deleteBoard({
      variables,
      optimisticResponse: {
        deleteBoard: {
          id: variables.boardId,
        },
      },
    });
}
