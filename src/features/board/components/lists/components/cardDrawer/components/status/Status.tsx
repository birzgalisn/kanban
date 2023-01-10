import React from "react";
import Select from "react-select";

import { useMoveCard } from "../../../../hooks";

import type { Card } from "../../CardDrawer";

import { useStatus } from "./hooks";

import { TextSkeleton } from "@/components/skeleton";

export const Status: React.FC<{ isLoading: boolean; card?: Card }> = ({
  isLoading,
  card,
}) => {
  const [options, defaultValue] = useStatus({ card });
  const moveCard = useMoveCard();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">Status</h2>
      {!isLoading ? (
        <Select
          {...{ options, defaultValue }}
          onChange={(option) => {
            if (!defaultValue || !option || !card) return;
            moveCard({
              source: defaultValue.value as string,
              destination: option.value as string,
              id: card?.id,
            });
          }}
        />
      ) : (
        <TextSkeleton className="h-9" fluid />
      )}
    </div>
  );
};
