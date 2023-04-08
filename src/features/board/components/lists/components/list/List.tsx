import { Button } from '@/ui/button';
import { Counter } from '@/ui/counter';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React from 'react';
import { HiPlus } from 'react-icons/hi2';

// To avoid Next SSR issues, use dynamic module import with SSR disabled
const Droppable = dynamic(() => import('react-beautiful-dnd').then((mod) => mod.Droppable), {
  ssr: false,
});
const Draggable = dynamic(() => import('react-beautiful-dnd').then((mod) => mod.Draggable), {
  ssr: false,
});

import type {
  OpenModalProps,
  RenameModalProps,
  UseDeleteListProps,
  UseViewCardProps,
} from '../../hooks';
import type { Lists } from '../../Lists';

import { Actions } from './components/actions';

type List = Lists[0];

export type ListProps = {
  list: List;
  createCard: (props: OpenModalProps) => void;
  viewCard: (variables: UseViewCardProps) => void;
  renameList: (props: RenameModalProps) => void;
  deleteList: (variables: UseDeleteListProps) => void;
};

export const List: React.FC<ListProps> = ({
  list,
  createCard,
  viewCard,
  renameList,
  deleteList,
}) => {
  return (
    <div className="flex h-fit w-80 shrink-0 flex-col overflow-auto rounded-lg border bg-gray-50 px-2 py-4">
      <div className="mb-4 flex h-8 items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">{list.title}</h2>
          <Counter size="h-6 w-6" value={list.cards.length} />
        </div>
        <Actions {...{ list, renameList, deleteList }} />
      </div>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <div
            className={clsx(
              'flex h-[calc(100vh-19rem)] w-full flex-col overflow-hidden overflow-y-auto rounded-lg',
              snapshot.isDraggingOver && 'bg-gray-100',
            )}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.cards &&
              list.cards.map((card, idx) => (
                <Draggable key={card.id} draggableId={card.id} index={idx}>
                  {(provided, snapshot) => (
                    <div
                      className="max-w-80 mb-2 flex w-full rounded-lg border border-gray-200 bg-white p-4 shadow duration-300 ease-in-out hover:shadow-lg"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => viewCard({ id: card.id })}
                    >
                      <h2>{card.title}</h2>
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="mt-2 flex items-start">
        <Button
          icon={<HiPlus />}
          variant="transparent"
          size="xs"
          fluid
          left
          onClick={() => createCard({ id: list.id, title: list.title })}
        >
          Add item
        </Button>
      </div>
    </div>
  );
};
