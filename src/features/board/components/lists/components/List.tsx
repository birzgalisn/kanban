import { Counter } from "@/ui/counter";
import clsx from "clsx";
import dynamic from "next/dynamic";
import React from "react";

// To avoid Next SSR issues, use dynamic module import with SSR disabled
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false },
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false },
);

import type { UseViewCardProps } from "../hooks";
import type { Lists } from "../Lists";

type List = Lists[0];

export type ListProps = {
  list: List;
  action: React.ReactElement;
  viewCard: (variables: UseViewCardProps) => void;
};

export const List: React.FC<ListProps> = ({ list, action, viewCard }) => {
  return (
    <div className="flex min-h-full w-80 shrink-0 flex-col">
      <div className="mb-6 flex h-8 items-start justify-between">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">{list.title}</h2>
          <Counter size="h-6 w-6" value={list.cards.length} />
        </div>
        {action}
      </div>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <div
            className={clsx(
              "flex h-full w-full flex-col rounded-lg",
              snapshot.isDraggingOver && "bg-gray-100",
            )}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.cards &&
              list.cards.map((card, idx) => (
                <Draggable key={card.id} draggableId={card.id} index={idx}>
                  {(provided, snapshot) => (
                    <div
                      className="max-w-80 mb-4 flex w-full rounded-lg border border-gray-200 bg-white p-4 shadow duration-300 ease-in-out hover:shadow-lg"
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
    </div>
  );
};
