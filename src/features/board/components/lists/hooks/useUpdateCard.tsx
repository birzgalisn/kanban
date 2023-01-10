import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { z } from "zod";

import { GET_CARD } from "./useViewCard";

import type {
  UpdateCardMutation,
  UpdateCardMutationVariables,
} from "./__generated__/useUpdateCard.generated";
import type {
  CardQuery,
  CardQueryVariables,
} from "./__generated__/useViewCard.generated";

import { useZodForm } from "@/components/form";

import { input as cardValidateError } from "@/fixtures/card/error";

const EditCardSchema = z.object({
  description: z
    .string()
    .min(1, { message: cardValidateError.description.length.tooSmall })
    .max(255, { message: cardValidateError.description.length.tooBig }),
});

type Card = CardQuery["card"];

type UseUpdateCardProps = {} & UpdateCardMutationVariables;

export function useUpdateCard() {
  const [updateCard] = useMutation<
    UpdateCardMutation,
    UpdateCardMutationVariables
  >(
    gql`
      mutation UpdateCard($input: UpdateCardInput!, $cardId: String!) {
        updateCard(input: $input, cardId: $cardId) {
          ... on MutationUpdateCardSuccess {
            data {
              id
              description
            }
          }
        }
      }
    `,
    {
      update(cache, { data }) {
        const updatedCard = data?.updateCard;

        if (updatedCard?.__typename !== "MutationUpdateCardSuccess") return;

        const cachedCard = cache.readQuery<CardQuery, CardQueryVariables>({
          query: GET_CARD,
          variables: {
            id: updatedCard.data.id,
          },
        })?.card;

        if (!cachedCard) return;

        cache.writeQuery<CardQuery, CardQueryVariables>({
          query: GET_CARD,
          variables: {
            id: updatedCard.data.id,
          },
          data: {
            card: {
              ...cachedCard,
              ...updatedCard.data,
            },
          },
        });
      },
    },
  );

  const [isCardInEdit, setIsCardInEdit] = useState<boolean>();
  const toggleEdit = (card?: Card) => {
    if (card) form.reset({ description: card.description ?? "" });
    setIsCardInEdit((prev) => !prev);
  };

  const form = useZodForm({ schema: EditCardSchema });
  const handleSubmit = ({ input, cardId }: UseUpdateCardProps) => {
    updateCard({
      variables: { input, cardId },
      optimisticResponse: {
        updateCard: {
          data: {
            id: cardId,
            description: input.description,
          },
        },
      },
      onCompleted() {
        form.reset();
        toggleEdit();
      },
    });
  };

  return [form, handleSubmit, isCardInEdit, toggleEdit] as const;
}
