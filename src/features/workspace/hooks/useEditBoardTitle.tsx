import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { z } from "zod";

import { useZodForm } from "@/components/form";
import type { ModalHandle } from "@/components/modal";
import type {
  EditBoardTitleMutation,
  EditBoardTitleMutationVariables,
} from "./__generated__/useEditBoardTitle.generated";

import { GET_BOARD } from "@/features/board/hooks";
import {
  BoardQuery,
  BoardQueryVariables,
} from "@/features/board/hooks/__generated__/useBoard.generated";
import { input as boardValidateError } from "@/fixtures/board/error";
import { GET_WORKSPACE } from "./useWorkspace";
import {
  WorkspaceQuery,
  WorkspaceQueryVariables,
} from "./__generated__/useWorkspace.generated";

const BoardTitleSchema = z.object({
  title: z
    .string()
    .min(1, { message: boardValidateError.title.length.tooSmall })
    .max(50, { message: boardValidateError.title.length.tooBig }),
});

export type EditModalProps = {
  id: string;
  title: string;
};

type UseEditBoardTitle = {} & EditBoardTitleMutationVariables;

export function useEditBoardTitle() {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const [editBoardTitle] = useMutation<
    EditBoardTitleMutation,
    EditBoardTitleMutationVariables
  >(
    gql`
      mutation EditBoardTitle($input: EditBoardTitleInput!, $boardId: String!) {
        editBoardTitle(input: $input, boardId: $boardId) {
          ... on MutationEditBoardTitleSuccess {
            data {
              id
              title
            }
          }
        }
      }
    `,
    {
      update(cache, { data }) {
        const editedBoard = data?.editBoardTitle;

        if (editedBoard?.__typename !== "MutationEditBoardTitleSuccess") return;

        const existingWorkspace = cache.readQuery<
          WorkspaceQuery,
          WorkspaceQueryVariables
        >({
          query: GET_WORKSPACE,
          variables: {
            workspaceId,
          },
        })?.workspace;

        if (!existingWorkspace) return;

        cache.writeQuery<WorkspaceQuery, WorkspaceQueryVariables>({
          query: GET_WORKSPACE,
          variables: { workspaceId },
          data: {
            workspace: {
              ...existingWorkspace,
              boards: existingWorkspace.boards.map((board) => {
                if (board.id === editedBoard.data.id)
                  return { ...board, ...editedBoard.data };
                return board;
              }),
            },
          },
        });

        const existingBoard = cache.readQuery<BoardQuery, BoardQueryVariables>({
          query: GET_BOARD,
          variables: {
            boardId: editedBoard.data.id,
            withWorkspace: false,
          },
        })?.board;

        if (!existingBoard) return;

        cache.writeQuery<BoardQuery, BoardQueryVariables>({
          query: GET_BOARD,
          variables: {
            boardId: editedBoard.data.id,
            withWorkspace: false,
          },
          data: {
            board: {
              ...existingBoard,
              ...editedBoard.data,
            },
          },
        });
      },
    },
  );

  const [editOnBoard, setEditOnBoard] = useState<EditModalProps>({
    id: "",
    title: "",
  });
  const modalRef = useRef<ModalHandle>(null);
  const openRenameModal = (props: EditModalProps) => {
    if (modalRef.current) {
      setEditOnBoard(props);
      form.reset({ title: props.title });
      modalRef.current.toggleVisibility();
    }
  };

  const form = useZodForm({ schema: BoardTitleSchema });
  const handleSubmit = async (input: UseEditBoardTitle["input"]) => {
    await editBoardTitle({
      variables: { input, boardId: editOnBoard.id },
      optimisticResponse: {
        editBoardTitle: {
          data: {
            id: editOnBoard.id,
            title: input.title,
          },
        },
      },
    });
    if (modalRef.current) {
      modalRef.current.toggleVisibility();
    }
  };

  return [form, handleSubmit, editOnBoard, modalRef, openRenameModal] as const;
}
