import { useMoveCard } from "../../../../hooks";

import type { Card } from "../../CardDrawer";

import { useStatus } from "./hooks";

import { TextSkeleton } from "@/components/skeleton";
import { Listbox } from "@headlessui/react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";

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
        <Listbox
          value={defaultValue.id}
          onChange={(selected) => {
            if (!defaultValue.id || !selected || !card?.id) return;
            moveCard({
              source: defaultValue.id,
              destination: selected,
              id: card.id,
            });
          }}
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative flex h-9 w-full cursor-default items-center rounded-lg border bg-white py-2 pl-3 pr-10 text-left focus:outline-none ">
              <span className="block truncate">{defaultValue.title}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <HiChevronUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 text-base shadow-lg">
              {options?.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-50 text-blue-500" : "text-gray-900"
                    }`
                  }
                  value={option.id}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.title}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
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
      ) : (
        <TextSkeleton className="h-9" fluid />
      )}
    </div>
  );
};
