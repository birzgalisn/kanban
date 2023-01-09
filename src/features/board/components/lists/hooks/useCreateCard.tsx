import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { z } from "zod";

import { CARD_PREVIEW_FIELDS, GET_BOARD } from "@/features/board/Board";

import type { ModalHandle } from "@/components/modal";
import type {
  BoardQuery,
  BoardQueryVariables,
} from "@/features/board/__generated__/Board.generated";
import type {
  CreateCardMutation,
  CreateCardMutationVariables,
} from "./__generated__/useCreateCard.generated";

import { useZodForm } from "@/components/form";

import { input as cardValidateError } from "@/fixtures/card/error";

const CardSchema = z.object({
  title: z
    .string()
    .min(1, { message: cardValidateError.title.length.tooSmall })
    .max(50, { message: cardValidateError.title.length.tooBig }),
});

type UseCreateCardProps = {} & CreateCardMutationVariables;

type OpenModalProps = { id: string; title: string };

export function useCreateCard() {
  const router = useRouter();
  const boardId = router.query.boardId as string;

  const [createCard] = useMutation<
    CreateCardMutation,
    CreateCardMutationVariables
  >(
    gql`
      mutation CreateCard($input: CreateCardInput!, $listId: String!) {
        createCard(input: $input, listId: $listId) {
          ... on MutationCreateCardSuccess {
            data {
              ...CardPreviewFields
            }
          }
        }
      }
      ${CARD_PREVIEW_FIELDS}
    `,
    {
      update(cache, { data }) {
        const createdCard = data?.createCard;

        if (createdCard?.__typename !== "MutationCreateCardSuccess") return;

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
              lists: existingBoard.lists.map((list) => {
                if (list.id !== createdCard.data.listId) return list;
                return {
                  ...list,
                  cards: list.cards.concat(createdCard.data),
                };
              }),
            },
          },
        });
      },
    },
  );

  const [openOnList, setOpenOnList] = useState<OpenModalProps>({
    id: "",
    title: "",
  });
  const modalRef = useRef<ModalHandle>(null);
  const openModal = (props: OpenModalProps) => {
    if (modalRef.current) {
      setOpenOnList(props);
      modalRef.current.toggleVisibility();
    }
  };

  const form = useZodForm({ schema: CardSchema });
  const handleSubmit = async (input: UseCreateCardProps["input"]) => {
    await createCard({ variables: { input, listId: openOnList.id } });
    if (modalRef.current) {
      form.reset();
      modalRef.current.toggleVisibility();
    }
  };

  return [form, handleSubmit, openOnList, modalRef, openModal] as const;
}
