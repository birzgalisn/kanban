import dynamic from "next/dynamic";
import React from "react";

// To avoid Next SSR issues, use dynamic module import with SSR disabled
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false },
);

import type { Cards } from "../Cards";

type Card = Cards[0];

export const Card: React.FC<{ card: Card; index: number }> = ({
  card,
  index,
}) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h2>{card.title}</h2>
        </div>
      )}
    </Draggable>
  );
};
