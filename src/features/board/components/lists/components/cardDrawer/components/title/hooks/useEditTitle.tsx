import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { z } from 'zod';

import { GET_CARD } from '@/features/board/components/lists/hooks';

import type {
  CardQuery,
  CardQueryVariables,
} from '@/features/board/components/lists/hooks/__generated__/useViewCard.generated';
import type {
  EditCardTitleMutation,
  EditCardTitleMutationVariables,
} from './__generated__/useEditTitle.generated';

import { useZodForm } from '@/components/form';

import { input as cardValidateError } from '@/fixtures/card/error';

const EditTitleSchema = z.object({
  title: z
    .string()
    .min(1, { message: cardValidateError.title.length.tooSmall })
    .max(50, { message: cardValidateError.title.length.tooBig }),
});

type Card = CardQuery['card'];

type UseEditCardTitleProps = EditCardTitleMutationVariables;

export function useEditCardTitle() {
  const [editCardTitle] = useMutation<EditCardTitleMutation, EditCardTitleMutationVariables>(
    gql`
      mutation EditCardTitle($input: EditCardTitleInput!, $cardId: String!) {
        editCardTitle(input: $input, cardId: $cardId) {
          ... on MutationEditCardTitleSuccess {
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
        const editedCard = data?.editCardTitle;

        if (editedCard?.__typename !== 'MutationEditCardTitleSuccess') return;

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

  const [isCardTitleInEdit, setIsCardTitleInEdit] = useState<boolean>();
  const toggleEdit = (card?: Card) => {
    if (card) form.reset({ title: card.title ?? '' });
    setIsCardTitleInEdit((prev) => !prev);
  };

  const form = useZodForm({ schema: EditTitleSchema });
  const handleSubmit = ({ input, cardId }: UseEditCardTitleProps) => {
    editCardTitle({
      variables: { input, cardId },
      optimisticResponse: {
        editCardTitle: {
          data: {
            id: cardId,
            title: input.title,
          },
        },
      },
      onCompleted() {
        form.reset();
        toggleEdit();
      },
    });
  };

  return [form, handleSubmit, isCardTitleInEdit, toggleEdit] as const;
}
