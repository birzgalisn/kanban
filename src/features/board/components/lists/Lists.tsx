import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { flatten } from "lodash";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { z } from "zod";

// To avoid Next SSR issues, use dynamic module import with SSR disabled
const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false },
);

import {
  CARD_PREVIEW_FIELDS,
  GET_BOARD,
  LIST_PREVIEW_FIELDS,
} from "../../Board";

import type { DropResult } from "react-beautiful-dnd";
import type {
  BoardQuery,
  BoardQueryVariables,
} from "../../__generated__/Board.generated";
import type {
  CardQuery,
  CardQueryVariables,
  CreateCardMutation,
  CreateCardMutationVariables,
  CreateListMutation,
  CreateListMutationVariables,
  MoveCardMutation,
  MoveCardMutationVariables,
  UpdateCardMutation,
  UpdateCardMutationVariables,
} from "./__generated__/Lists.generated";

import { Drawer, DrawerHandle } from "@/components/drawer";
import { Form, Input, useZodForm } from "@/components/form";
import { Modal, ModalHandle } from "@/components/modal";
import { BoardButton } from "@/ui/boardButton";
import { Button } from "@/ui/button";
import { HiOutlinePencilSquare, HiPlus } from "react-icons/hi2";
import { List } from "./components/List";
import { ListsWrapper } from "./components/ListsWrapper";

import { input as cardValidateError } from "@/fixtures/card/error";
import { input as listValidateError } from "@/fixtures/list/error";

const GET_CARD = gql`
  query Card($id: String!) {
    card(id: $id) {
      id
      title
      description
    }
  }
`;

const CardSchema = z.object({
  title: z
    .string()
    .min(1, { message: cardValidateError.title.length.tooSmall })
    .max(50, { message: cardValidateError.title.length.tooBig }),
});

const ListSchema = z.object({
  title: z
    .string()
    .min(1, { message: listValidateError.title.length.tooSmall })
    .max(50, { message: listValidateError.title.length.tooBig }),
});

const EditCardSchema = z.object({
  description: z
    .string()
    .min(1, { message: cardValidateError.description.length.tooSmall })
    .max(255, { message: cardValidateError.description.length.tooBig }),
});

export type Lists = BoardQuery["board"]["lists"];

export const Lists: React.FC<{ lists?: Lists }> = ({ lists }) => {
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const [viewCardQuery, viewCardQueryResult] = useLazyQuery<
    CardQuery,
    CardQueryVariables
  >(GET_CARD);
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
  const [createCard] = useMutation<
    CreateCardMutation,
    CreateCardMutationVariables
  >(gql`
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
  `);
  const [createList] = useMutation<
    CreateListMutation,
    CreateListMutationVariables
  >(gql`
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
  `);
  const [updateCard] = useMutation<
    UpdateCardMutation,
    UpdateCardMutationVariables
  >(gql`
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
  `);

  const onDragEnd = (res: DropResult) => {
    if (res.destination) {
      const draggableId = res.draggableId;
      const source = res.source.droppableId;
      const destination = res.destination.droppableId;

      if (source === destination) return;

      moveCard({
        variables: { id: draggableId, destination: destination },
        optimisticResponse: {
          moveCard: { id: draggableId, listId: destination },
        },
        update(cache, { data }) {
          const movedCard = data?.moveCard;

          if (!movedCard) return;

          const existingBoard = cache.readQuery<
            BoardQuery,
            BoardQueryVariables
          >({
            query: GET_BOARD,
            variables: { id: boardId },
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
            variables: { id: boardId },
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
  };

  const createCardForm = useZodForm({ schema: CardSchema });
  const createCardModalRef = useRef<ModalHandle>(null);
  const [createCardParent, setCreateCardParent] = useState<{
    id: string;
    title: string;
  }>({ id: "", title: "" });

  const createListForm = useZodForm({ schema: ListSchema });
  const createListModalRef = useRef<ModalHandle>(null);

  const viewCardDrawerRef = useRef<DrawerHandle>(null);
  const viewCard = (id: string) => {
    viewCardQuery({
      variables: { id },
      onCompleted({ card }) {
        if (!card) return;
        editCardForm.reset({ description: card.description ?? "" });
      },
    });
    if (viewCardDrawerRef.current) {
      viewCardDrawerRef.current.toggleVisibility();
    }
  };

  const selectedCard = viewCardQueryResult.data?.card;
  const editCardForm = useZodForm({
    schema: EditCardSchema,
  });
  const [isEditing, setIsEditing] = useState<boolean>();

  return (
    <ListsWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        {lists &&
          lists.map((list) => (
            <List
              key={list.id}
              list={list}
              action={
                <Button
                  icon={<HiPlus className="h-4 w-4" />}
                  variant="transparent"
                  size="sm"
                  onClick={() => {
                    if (createCardModalRef.current) {
                      setCreateCardParent({ id: list.id, title: list.title });
                      createCardModalRef.current.toggleVisibility();
                    }
                  }}
                />
              }
              viewCard={viewCard}
            />
          ))}
      </DragDropContext>
      <BoardButton
        title="Create a new list"
        sizes="w-64 h-10"
        createModalRef={createListModalRef}
      />
      <Drawer title={selectedCard?.title} ref={viewCardDrawerRef}>
        <div className="mb-2 flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Description</h2>
          <Button
            size="sm"
            variant="transparent"
            icon={<HiOutlinePencilSquare className="h-4 w-4" />}
            onClick={() => setIsEditing((prev) => !prev)}
          />
        </div>
        {!isEditing ? (
          selectedCard?.description ? (
            <p>{selectedCard.description}</p>
          ) : (
            <p>No description added</p>
          )
        ) : (
          <Form
            form={editCardForm}
            onSubmit={(input) => {
              if (!selectedCard) return;

              updateCard({
                variables: { input, cardId: selectedCard.id },
                optimisticResponse: {
                  updateCard: {
                    data: {
                      id: selectedCard.id,
                      description: editCardForm.getValues().description,
                    },
                  },
                },
                update(cache, { data }) {
                  const updatedCard = data?.updateCard;

                  if (updatedCard?.__typename !== "MutationUpdateCardSuccess")
                    return;

                  const cachedCard = cache.readQuery<
                    CardQuery,
                    CardQueryVariables
                  >({
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
                onCompleted() {
                  setIsEditing(false);
                },
              });
            }}
          >
            <Input
              placeholder="Enter the new card description text"
              {...editCardForm.register("description")}
            />
            <div className="flex flex-row gap-6">
              <Button type="submit">Edit</Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Drawer>
      <Modal
        title={`Create a new ${createCardParent.title} card`}
        subtitle="What you stay focused on will grow"
        ref={createCardModalRef}
      >
        <Form
          form={createCardForm}
          onSubmit={async (input) => {
            await createCard({
              variables: { input, listId: createCardParent.id },
              update(cache, { data }) {
                const createdCard = data?.createCard;

                if (createdCard?.__typename !== "MutationCreateCardSuccess")
                  return;

                const existingBoard = cache.readQuery<
                  BoardQuery,
                  BoardQueryVariables
                >({
                  query: GET_BOARD,
                  variables: { id: boardId },
                })?.board;

                if (!existingBoard) return;

                cache.writeQuery<BoardQuery, BoardQueryVariables>({
                  query: GET_BOARD,
                  variables: { id: boardId },
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
            });

            if (createCardModalRef.current) {
              createCardForm.reset();
              createCardModalRef.current.toggleVisibility();
            }
          }}
        >
          <Input
            label="Title"
            placeholder="Enter the new card title"
            {...createCardForm.register("title")}
          />
          <Button
            type="submit"
            isLoading={createCardForm.formState.isSubmitting}
          >
            Create
          </Button>
        </Form>
      </Modal>
      <Modal
        title="Create a new list"
        subtitle="You're off to great places! Today is your day!"
        ref={createListModalRef}
      >
        <Form
          form={createListForm}
          onSubmit={async (input) => {
            await createList({
              variables: { input, boardId: boardId },
              update(cache, { data }) {
                const createdList = data?.createList;

                if (createdList?.__typename !== "MutationCreateListSuccess")
                  return;

                const existingBoard = cache.readQuery<
                  BoardQuery,
                  BoardQueryVariables
                >({ query: GET_BOARD, variables: { id: boardId } })?.board;

                if (!existingBoard) return;

                cache.writeQuery<BoardQuery, BoardQueryVariables>({
                  query: GET_BOARD,
                  variables: { id: boardId },
                  data: {
                    board: {
                      ...existingBoard,
                      lists: existingBoard.lists.concat(createdList.data),
                    },
                  },
                });

                if (createListModalRef.current) {
                  createListForm.reset();
                  createListModalRef.current.toggleVisibility();
                }
              },
            });
          }}
        >
          <Input
            label="Title"
            placeholder="Enter the new list title"
            {...createListForm.register("title")}
          />
          <Button
            type="submit"
            isLoading={createListForm.formState.isSubmitting}
          >
            Create
          </Button>
        </Form>
      </Modal>
    </ListsWrapper>
  );
};
