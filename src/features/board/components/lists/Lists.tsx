import dynamic from 'next/dynamic';
import React from 'react';

// To avoid Next SSR issues, use dynamic module import with SSR disabled
const DragDropContext = dynamic(
  () => import('react-beautiful-dnd').then((mod) => mod.DragDropContext),
  { ssr: false },
);

import {
  useCreateCard,
  useCreateList,
  useDeleteList,
  useMoveCard,
  useRenameList,
  useViewCard,
} from './hooks';

import type { DropResult } from 'react-beautiful-dnd';
import type { BoardQuery } from '../../hooks/__generated__/useBoard.generated';

import { Form, Input } from '@/components/form';
import { Modal } from '@/components/modal';
import { BoardButton } from '@/ui/boardButton';
import { Button } from '@/ui/button';
import { CardDrawer } from './components/cardDrawer';
import { List } from './components/list';
import { ListsWrapper } from './components/ListsWrapper';

export type Lists = BoardQuery['board']['lists'];

export const Lists: React.FC<{ lists?: Lists }> = ({ lists }) => {
  const [createListForm, handleCreateListSubmit, createListModalRef] = useCreateList();

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

  const [
    renameListForm,
    handleRenameListSubmit,
    renameOnList,
    renameListModalRef,
    openRenameListModal,
  ] = useRenameList();

  const deleteList = useDeleteList();

  return (
    <>
      <ListsWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          {lists &&
            lists.map((list) => (
              <List
                key={list.id}
                list={list}
                createCard={openCreateCardModal}
                viewCard={viewCard}
                renameList={openRenameListModal}
                deleteList={deleteList}
              />
            ))}
        </DragDropContext>
        <BoardButton
          title="Create a new list"
          sizes="w-64 h-16"
          createModalRef={createListModalRef}
        />
      </ListsWrapper>
      <CardDrawer isLoading={viewCardResult.loading} card={selectedCard} ref={viewCardDrawerRef} />
      <Modal
        title={`Rename ${renameOnList.title} list`}
        subtitle="Take chances, make mistakes. That's how you grow"
        ref={renameListModalRef}
      >
        <Form form={renameListForm} onSubmit={handleRenameListSubmit}>
          <Input
            label="Title"
            placeholder="Enter the new list title"
            {...renameListForm.register('title')}
            autoFocus
          />
          <Button type="submit" isLoading={renameListForm.formState.isSubmitting}>
            Rename
          </Button>
        </Form>
      </Modal>
      <Modal
        title={`Create a new ${openOnList.title} card`}
        subtitle="What you stay focused on will grow"
        ref={createCardModalRef}
      >
        <Form form={createCardForm} onSubmit={handleCreateCardSubmit}>
          <Input
            label="Title"
            placeholder="Enter the new card title"
            {...createCardForm.register('title')}
            autoFocus
          />
          <Button type="submit" isLoading={createCardForm.formState.isSubmitting}>
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
            {...createListForm.register('title')}
            autoFocus
          />
          <Button type="submit" isLoading={createListForm.formState.isSubmitting}>
            Create
          </Button>
        </Form>
      </Modal>
    </>
  );
};
