import React from "react";

import type { Lists } from "../lists";
import type { ListProps } from "../lists/components/List";

import { CardPreview } from "./components/CardPreview";

export type Cards = Lists[0]["cards"];

export type CardsProps = {
  cards?: Cards;
  viewCard: ListProps["viewCard"];
};

export const Cards: React.FC<CardsProps> = ({ cards, viewCard }) => {
  return (
    <div className="flex flex-col">
      {cards &&
        cards.map((card, idx) => (
          <CardPreview
            key={card.id}
            card={card}
            index={idx}
            viewCard={viewCard}
          />
        ))}
    </div>
  );
};
