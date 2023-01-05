import React from "react";

import type { Lists } from "../lists";

import { Card } from "./components/Card";

export type Cards = Lists[0]["cards"];

export const Cards: React.FC<{ cards?: Cards }> = ({ cards }) => {
  return (
    <div className="flex flex-col">
      {cards &&
        cards.map((card, idx) => (
          <Card key={card.id} card={card} index={idx} />
        ))}
    </div>
  );
};
