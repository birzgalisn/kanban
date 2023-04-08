import React from 'react';

import { useDelete } from './hooks';

import type { Card } from '../../CardDrawer';
import type { UseDeleteProps } from './hooks';

import { ButtonSkeleton } from '@/components/skeleton';
import { Button } from '@/ui/button';
import { HiOutlineArchiveBox, HiOutlineTrash } from 'react-icons/hi2';

type ActionsProps = { isLoading: boolean; card?: Card } & UseDeleteProps;

export const Actions: React.FC<ActionsProps> = ({ isLoading, card, drawerRef }) => {
  const deleteCard = useDelete({ drawerRef });

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-1 p-6">
        {Array(2)
          .fill(0)
          .map((_, idx) => (
            <ButtonSkeleton key={idx} className="h-9" fluid />
          ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-1 p-6">
      <Button icon={<HiOutlineArchiveBox />} variant="transparent" size="xs" fluid left disabled>
        Achive
      </Button>
      <Button
        icon={<HiOutlineTrash />}
        variant="danger"
        size="xs"
        fluid
        left
        onClick={() => {
          if (!card) return;
          deleteCard({ id: card.id });
        }}
      >
        Delete from project
      </Button>
    </div>
  );
};
