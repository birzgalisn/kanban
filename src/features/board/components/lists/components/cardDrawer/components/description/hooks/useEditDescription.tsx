import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { z } from 'zod';

import { GET_CARD } from '@/features/board/components/lists/hooks';

import type {
  CardQuery,
  CardQueryVariables,
} from '@/features/board/components/lists/hooks/__generated__/useViewCard.generated';
import type {
  EditCardDescriptionMutation,
  EditCardDescriptionMutationVariables,
} from './__generated__/useEditDescription.generated';

import { useZodForm } from '@/components/form';

import { input as cardValidateError } from '@/fixtures/card/error';

const EditDescriptionSchema = z.object({
  description: z
    .string()
    .min(1, { message: cardValidateError.description.length.tooSmall })
    .max(255, { message: cardValidateError.description.length.tooBig }),
});

type Card = CardQuery['card'];

type UseEditCardDescriptionProps = EditCardDescriptionMutationVariables;

export function useEditDescription() {
  const [editCardTitle] = useMutation<
    EditCardDescriptionMutation,
    EditCardDescriptionMutationVariables
  >(
    gql`
      mutation EditCardDescription($input: EditCardDescriptionInput!, $cardId: String!) {
        editCardDescription(input: $input, cardId: $cardId) {
          ... on MutationEditCardDescriptionSuccess {
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
        const editedCard = data?.editCardDescription;

        if (editedCard?.__typename !== 'MutationEditCardDescriptionSuccess') return;

        const cachedCard = cache.readQuery<CardQuery, CardQueryVariables>({
          query: GET_CARD,
          variables: {
            id: editedCard.data.id,
          },
        })?.card;

        if (!cachedCard) return;

        cache.writeQuery<CardQuery, CardQueryVariables>({
          query: GET_CARD,
          variables: {
            id: editedCard.data.id,
          },
          data: {
            card: {
              ...cachedCard,
              ...editedCard.data,
            },
          },
        });
      },
    },
  );

  const [isCardDescriptionInEdit, setIsCardDescriptionInEdit] = useState<boolean>();
  const toggleEdit = (card?: Card) => {
    if (card) form.reset({ description: card.description ?? '' });
    setIsCardDescriptionInEdit((prev) => !prev);
  };

  const form = useZodForm({ schema: EditDescriptionSchema });
  const handleSubmit = ({ input, cardId }: UseEditCardDescriptionProps) => {
    editCardTitle({
      variables: { input, cardId },
      optimisticResponse: {
        editCardDescription: {
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

  return [form, handleSubmit, isCardDescriptionInEdit, toggleEdit] as const;
}
