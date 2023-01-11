import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { GET_BOARD } from "@/features/board/hooks";

import type {
  BoardQuery,
  BoardQueryVariables,
} from "@/features/board/hooks/__generated__/useBoard.generated";
import type {
  DeleteListMutation,
  DeleteListMutationVariables,
} from "./__generated__/useDeleteList.generated";

export type UseDeleteListProps = {} & DeleteListMutationVariables;

export function useDeleteList() {
  const router = useRouter();
  const boardId = router.query.boardId as string;

  const [deleteList] = useMutation<
    DeleteListMutation,
    DeleteListMutationVariables
  >(
    gql`
      mutation DeleteList($id: String!) {
        deleteList(id: $id) {
          id
        }
      }
    `,
  );

  return (variables: UseDeleteListProps) =>
    deleteList({
      variables,
      optimisticResponse: {
        deleteList: { id: variables.id },
      },
      update(cache, { data }) {
        const deletedList = data?.deleteList;

        if (!deletedList) return;

        const existingBoard = cache.readQuery<BoardQuery, BoardQueryVariables>({
          query: GET_BOARD,
          variables: { boardId, withWorkspace: false },
        })?.board;

        if (!existingBoard) return;

        cache.writeQuery<BoardQuery, BoardQueryVariables>({
          query: GET_BOARD,
          variables: { boardId, withWorkspace: false },
          data: {
            board: {
              ...existingBoard,
              lists: existingBoard.lists.filter((l) => l.id !== deletedList.id),
            },
          },
        });
      },
    });
}
