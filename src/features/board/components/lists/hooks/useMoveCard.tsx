import { gql, useMutation } from "@apollo/client";
import { flatten } from "lodash";
import { useRouter } from "next/router";

import { GET_BOARD } from "@/features/board/Board";

import type {
  BoardQuery,
  BoardQueryVariables,
} from "@/features/board/__generated__/Board.generated";
import type {
  MoveCardMutation,
  MoveCardMutationVariables,
} from "./__generated__/useMoveCard.generated";

type UseMoveCardProps = {
  source: string;
} & MoveCardMutationVariables;

export function useMoveCard() {
  const router = useRouter();
  const boardId = router.query.boardId as string;

  const [moveCard] = useMutation<MoveCardMutation, MoveCardMutationVariables>(
    gql`
      mutation MoveCard($id: String!, $destination: String!) {
        moveCard(id: $id, destination: $destination) {
          id
          listId
        }
      }
    `,
  );

  return ({ id, source, destination }: UseMoveCardProps) =>
    moveCard({
      variables: { id, destination },
      optimisticResponse: {
        moveCard: { id, listId: destination },
      },
      update(cache, { data }) {
        const movedCard = data?.moveCard;

        if (!movedCard) return;

        const existingBoard = cache.readQuery<BoardQuery, BoardQueryVariables>({
          query: GET_BOARD,
          variables: { boardId, withWorkspace: false },
        })?.board;

        if (!existingBoard) return;

        const allCards = flatten(existingBoard.lists.map((l) => l.cards));
        const card = allCards.find((c) => c.id === movedCard.id);

        if (!card) return;

        const updatedLists = existingBoard.lists.map((list) => {
          if (list.id === source) {
            return {
              ...list,
              cards: list.cards.filter((c) => c.id !== card.id),
            };
          }
          if (list.id === destination) {
            return {
              ...list,
              cards: list.cards.concat(card),
            };
          }
          return list;
        });

        cache.writeQuery<BoardQuery, BoardQueryVariables>({
          query: GET_BOARD,
          variables: { boardId, withWorkspace: false },
          data: {
            board: {
              ...existingBoard,
              lists: updatedLists,
            },
          },
        });
      },
    });
}
