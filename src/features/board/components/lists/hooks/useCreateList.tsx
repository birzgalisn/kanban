import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRef } from "react";
import { z } from "zod";

import { GET_BOARD, LIST_PREVIEW_FIELDS } from "@/features/board/hooks";
import { GET_WORKSPACE } from "@/features/workspace/hooks";

import type { ModalHandle } from "@/components/modal";
import type {
  BoardQuery,
  BoardQueryVariables,
} from "@/features/board/hooks/__generated__/useBoard.generated";
import type {
  WorkspaceQuery,
  WorkspaceQueryVariables,
} from "@/features/workspace/hooks/__generated__/useWorkspace.generated";
import type {
  CreateListMutation,
  CreateListMutationVariables,
} from "./__generated__/useCreateList.generated";

import { useZodForm } from "@/components/form";

import { input as listValidateError } from "@/fixtures/list/error";

const ListSchema = z.object({
  title: z
    .string()
    .min(1, { message: listValidateError.title.length.tooSmall })
    .max(50, { message: listValidateError.title.length.tooBig }),
});

type UseCreateListProps = {} & CreateListMutationVariables;

export function useCreateList() {
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const workspaceId = router.query.workspaceId as string;

  const [createList] = useMutation<
    CreateListMutation,
    CreateListMutationVariables
  >(
    gql`
      mutation CreateList($input: CreateListInput!, $boardId: String!) {
        createList(input: $input, boardId: $boardId) {
          ... on MutationCreateListSuccess {
            data {
              ...ListPreviewFields
            }
          }
        }
      }
      ${LIST_PREVIEW_FIELDS}
    `,
    {
      update(cache, { data }) {
        const createdList = data?.createList;

        if (createdList?.__typename !== "MutationCreateListSuccess") return;

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
              lists: existingBoard.lists.concat(createdList.data),
            },
          },
        });

        const existingWorkspace = cache.readQuery<
          WorkspaceQuery,
          WorkspaceQueryVariables
        >({ query: GET_WORKSPACE, variables: { workspaceId } })?.workspace;

        if (!existingWorkspace) return;

        cache.writeQuery<WorkspaceQuery, WorkspaceQueryVariables>({
          query: GET_WORKSPACE,
          variables: { workspaceId },
          data: {
            workspace: {
              ...existingWorkspace,
              boards: existingWorkspace.boards.map((board) => {
                if (board.id === existingBoard.id)
                  return { ...board, totalLists: board.totalLists + 1 };
                return board;
              }),
            },
          },
        });
      },
    },
  );

  const modalRef = useRef<ModalHandle>(null);

  const form = useZodForm({ schema: ListSchema });
  const handleSubmit = async (input: CreateListMutationVariables["input"]) => {
    await createList({ variables: { input, boardId } });
    if (modalRef.current) {
      form.reset();
      modalRef.current.toggleVisibility();
    }
  };

  return [form, handleSubmit, modalRef] as const;
}
