import { useBoard } from "@/features/board/hooks";

import type { Card } from "../../../CardDrawer";

type UseStatusProps = { card?: Card };

export function useStatus({ card }: UseStatusProps) {
  const lists = useBoard().data?.board.lists;
  const activeList = lists?.find((l) => {
    const hasCard = l.cards.some((c) => c.id === card?.id);
    if (hasCard) return l;
  });

  const options = lists?.map((l) => ({ value: l.id, label: l.title }));
  const defaultValue = { value: activeList?.id, label: activeList?.title };

  return [options, defaultValue] as const;
}
