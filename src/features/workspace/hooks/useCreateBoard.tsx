import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRef } from "react";
import { z } from "zod";

import { BOARD_PREVIEW_FIELDS, GET_WORKSPACE } from "./useWorkspace";

import type { ModalHandle } from "@/components/modal";
import type {
  CreateBoardMutation,
  CreateBoardMutationVariables,
} from "./__generated__/useCreateBoard.generated";
import type {
  WorkspaceQuery,
  WorkspaceQueryVariables,
} from "./__generated__/useWorkspace.generated";

import { useZodForm } from "@/components/form";

import { input as boardValidateError } from "@/fixtures/board/error";

const BoardSchema = z.object({
  title: z
    .string()
    .min(1, { message: boardValidateError.title.length.tooSmall })
    .max(50, { message: boardValidateError.title.length.tooBig }),
});

type UseCreateBoardProps = {} & CreateBoardMutationVariables;

export function useCreateBoard() {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const [createBoard] = useMutation<
    CreateBoardMutation,
    CreateBoardMutationVariables
  >(
    gql`
      mutation CreateBoard($input: CreateBoardInput!, $workspaceId: String!) {
        createBoard(input: $input, workspaceId: $workspaceId) {
          ... on MutationCreateBoardSuccess {
            data {
              ...BoardPreviewFields
            }
          }
        }
      }
      ${BOARD_PREVIEW_FIELDS}
    `,
    {
      update(cache, { data }) {
        const createdBoard = data?.createBoard;

        if (createdBoard?.__typename !== "MutationCreateBoardSuccess") return;

        /** Merge cached `workspace` query field `boards` with `createBoard` mutation result */
        const existingWorkspace = cache.readQuery<
          WorkspaceQuery,
          WorkspaceQueryVariables
        >({
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
              boards: existingWorkspace.boards.concat(createdBoard.data),
            },
          },
        });
      },
    },
  );

  const createBoardModalRef = useRef<ModalHandle>(null);
  const toggleModal = () => {
    if (createBoardModalRef.current) {
      createBoardModalRef.current.toggleVisibility();
    }
  };

  const form = useZodForm({ schema: BoardSchema });
  const handleSubmit = async (input: UseCreateBoardProps["input"]) => {
    await createBoard({ variables: { input, workspaceId } });
    form.reset();
    toggleModal();
  };

  return [form, handleSubmit, createBoardModalRef, toggleModal] as const;
}
