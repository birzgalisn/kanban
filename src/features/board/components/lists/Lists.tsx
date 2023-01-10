import dynamic from "next/dynamic";
import React from "react";

// To avoid Next SSR issues, use dynamic module import with SSR disabled
const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false },
);

import {
  useCreateCard,
  useCreateList,
  useMoveCard,
  useUpdateCard,
  useViewCard,
} from "./hooks";

import type { DropResult } from "react-beautiful-dnd";
import type { BoardQuery } from "../../__generated__/Board.generated";

import { Drawer } from "@/components/drawer";
import { Form, Input } from "@/components/form";
import { Modal } from "@/components/modal";
import { BoardButton } from "@/ui/boardButton";
import { Button } from "@/ui/button";
import { HiOutlinePencilSquare, HiPlus } from "react-icons/hi2";
import { List } from "./components/List";
import { ListsWrapper } from "./components/ListsWrapper";

export type Lists = BoardQuery["board"]["lists"];

export const Lists: React.FC<{ lists?: Lists }> = ({ lists }) => {
  const [createListForm, handleCreateListSubmit, createListModalRef] =
    useCreateList();

  const [
    createCardForm,
    handleCreateCardSubmit,
    openOnList,
    createCardModalRef,
    openCreateCardModal,
  ] = useCreateCard();

  const moveCard = useMoveCard();
  const onDragEnd = (res: DropResult) => {
    if (res.destination) {
      const draggableId = res.draggableId;
      const source = res.source.droppableId;
      const destination = res.destination.droppableId;
      if (source === destination) return;
      moveCard({ id: draggableId, source, destination });
    }
  };

  const [viewCard, viewCardResult, viewCardDrawerRef] = useViewCard();
  const selectedCard = viewCardResult.data?.card;

  const [editCardForm, handleEditCardSubmit, isCardInEdit, toggleCardEdit] =
    useUpdateCard();

  return (
    <>
      <ListsWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          {lists &&
            lists.map((list) => (
              <List
                key={list.id}
                list={list}
                action={
                  <Button
                    icon={<HiPlus className="h-5 w-5" />}
                    variant="transparent"
                    size="xs"
                    onClick={() =>
                      openCreateCardModal({ id: list.id, title: list.title })
                    }
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
      </ListsWrapper>
      <Drawer title={selectedCard?.title} ref={viewCardDrawerRef}>
        <div className="mb-2 flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Description</h2>
          <Button
            size="sm"
            variant="transparent"
            icon={<HiOutlinePencilSquare className="h-4 w-4" />}
            onClick={() => toggleCardEdit(selectedCard)}
          />
        </div>
        {!isCardInEdit ? (
          selectedCard?.description ? (
            <p>{selectedCard.description}</p>
          ) : (
            <p>No description added</p>
          )
        ) : (
          <Form
            form={editCardForm}
            onSubmit={(input) =>
              handleEditCardSubmit({ input, cardId: selectedCard?.id ?? "" })
            }
          >
            <Input
              placeholder="Enter the new card description text"
              {...editCardForm.register("description")}
            />
            <div className="flex flex-row gap-6">
              <Button type="submit">Edit</Button>
              <Button variant="secondary" onClick={() => toggleCardEdit()}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Drawer>
      <Modal
        title={`Create a new ${openOnList.title} card`}
        subtitle="What you stay focused on will grow"
        ref={createCardModalRef}
      >
        <Form form={createCardForm} onSubmit={handleCreateCardSubmit}>
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
        <Form form={createListForm} onSubmit={handleCreateListSubmit}>
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
    </>
  );
};
