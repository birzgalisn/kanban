import clsx from "clsx";
import dynamic from "next/dynamic";
import React from "react";

// To avoid Next SSR issues, use dynamic module import with SSR disabled
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false },
);

import type { Lists } from "../Lists";

import { Cards } from "../../cards";

type List = Lists[0];

type ListProps = {
  list: List;
  action: React.ReactElement;
};

export const List: React.FC<ListProps> = ({ list, action }) => {
  return (
    <div className="flex h-full w-64 flex-col gap-4" key={list.id}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {list.title} ({list.cards.length})
        </h2>
        {action}
      </div>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <div
            className={clsx(
              "flex h-full w-full flex-col rounded-lg",
              snapshot.isDraggingOver && "bg-gray-50",
            )}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Cards cards={list.cards} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
