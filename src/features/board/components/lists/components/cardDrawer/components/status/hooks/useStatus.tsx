import { useBoard } from "@/features/board/hooks";

import type { Card } from "../../../CardDrawer";

type UseStatusProps = { card?: Card };

export type Option = {
  id?: string;
  title?: string;
};

export function useStatus({ card }: UseStatusProps) {
  const lists = useBoard().data?.board.lists;
  const activeList = lists?.find((l) => {
    const hasCard = l.cards.some((c) => c.id === card?.id);
    if (hasCard) return l;
  });

  const options: Array<Option> = lists!.map((l) => ({
    id: l.id,
    title: l.title,
  }));
  const defaultValue: Option = { id: activeList?.id, title: activeList?.title };

  return [options, defaultValue] as const;
}
