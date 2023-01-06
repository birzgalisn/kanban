import dynamic from "next/dynamic";
import React from "react";

// To avoid Next SSR issues, use dynamic module import with SSR disabled
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false },
);

import type { Cards, CardsProps } from "../Cards";

type Card = Cards[0];

type CardPreviewProps = {
  card: Card;
  index: number;
  viewCard: CardsProps["viewCard"];
};

export const CardPreview: React.FC<CardPreviewProps> = ({
  card,
  index,
  viewCard,
}) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => viewCard(card.id)}
        >
          <h2>{card.title}</h2>
        </div>
      )}
    </Draggable>
  );
};
