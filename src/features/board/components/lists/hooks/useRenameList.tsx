import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { z } from "zod";

import { GET_BOARD } from "@/features/board/hooks";

import type { ModalHandle } from "@/components/modal";
import type {
  BoardQuery,
  BoardQueryVariables,
} from "@/features/board/hooks/__generated__/useBoard.generated";
import type {
  RenameListMutation,
  RenameListMutationVariables,
} from "./__generated__/useRenameList.generated";

import { useZodForm } from "@/components/form";

import { input as listValidateError } from "@/fixtures/list/error";

const ListSchema = z.object({
  title: z
    .string()
    .min(1, { message: listValidateError.title.length.tooSmall })
    .max(50, { message: listValidateError.title.length.tooBig }),
});

export type RenameModalProps = {
  id: string;
  title: string;
};

type UseRenameListProps = {} & RenameListMutationVariables;

export function useRenameList() {
  const router = useRouter();
  const boardId = router.query.boardId as string;

  const [renameList] = useMutation<
    RenameListMutation,
    RenameListMutationVariables
  >(
    gql`
      mutation RenameList($input: RenameListInput!, $id: String!) {
        renameList(input: $input, id: $id) {
          ... on MutationRenameListSuccess {
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
        const renamedList = data?.renameList;

        if (renamedList?.__typename !== "MutationRenameListSuccess") return;

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
              lists: existingBoard.lists.map((l) => {
                if (l.id !== renamedList.data.id) return l;
                return {
                  ...l,
                  ...renamedList.data,
                };
              }),
            },
          },
        });
      },
    },
  );

  const [renameOnList, setRenameOnList] = useState<RenameModalProps>({
    id: "",
    title: "",
  });
  const modalRef = useRef<ModalHandle>(null);
  const openRenameModal = (props: RenameModalProps) => {
    if (modalRef.current) {
      setRenameOnList(props);
      form.reset({ title: props.title });
      modalRef.current.toggleVisibility();
    }
  };

  const form = useZodForm({ schema: ListSchema });
  const handleSubmit = async (input: UseRenameListProps["input"]) => {
    await renameList({ variables: { input, id: renameOnList.id } });
    if (modalRef.current) {
      form.reset();
      modalRef.current.toggleVisibility();
    }
  };

  return [form, handleSubmit, renameOnList, modalRef, openRenameModal] as const;
}
