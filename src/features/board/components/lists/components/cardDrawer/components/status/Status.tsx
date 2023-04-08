import clsx from 'clsx';
import { useMoveCard } from '../../../../hooks';

import type { Card } from '../../CardDrawer';

import { useStatus } from './hooks';

import { TextSkeleton } from '@/components/skeleton';
import { Listbox } from '@headlessui/react';
import { HiCheck, HiChevronUpDown } from 'react-icons/hi2';

export const Status: React.FC<{ isLoading: boolean; card?: Card }> = ({ isLoading, card }) => {
  const [options, defaultValue] = useStatus({ card });
  const moveCard = useMoveCard();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <TextSkeleton className="h-7 w-24" />
        <TextSkeleton className="h-9" fluid />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">Status</h2>
      <Listbox
        value={defaultValue.id}
        onChange={(selectedId) => {
          if (!defaultValue.id || !selectedId || !card?.id) return;
          else if (defaultValue.id === selectedId) return;
          moveCard({
            source: defaultValue.id,
            destination: selectedId,
            id: card.id,
          });
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative flex h-9 w-full cursor-default items-center rounded-lg border bg-white py-2 pl-3 pr-10 text-left text-base focus:outline-none ">
            <span className="block truncate">{defaultValue.title}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown className="h-5 w-5 text-gray-500" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white text-base shadow-lg focus:outline-none">
            {options?.map((option) => (
              <Listbox.Option
                key={option.id}
                className={({ active }) =>
                  clsx(
                    'relative mx-2 my-2 flex h-9 cursor-default select-none items-center rounded-lg pl-10 pr-4 text-gray-900',
                    active && 'bg-gray-100',
                  )
                }
                value={option.id}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={clsx('block truncate', selected ? 'font-medium' : 'font-normal')}
                    >
                      {option.title}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <HiCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};
