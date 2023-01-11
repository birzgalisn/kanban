import React from "react";

import { useEditCardTitle } from "./hooks";

import type { Card } from "../../CardDrawer";

import { Form, Input } from "@/components/form";
import { ButtonSkeleton, TextSkeleton } from "@/components/skeleton";
import { Button } from "@/ui/button";

export const Title: React.FC<{ isLoading: boolean; card?: Card }> = ({
  isLoading,
  card,
}) => {
  const [form, handleSubmit, isCardTitleInEdit, toggleEdit] =
    useEditCardTitle();

  if (isCardTitleInEdit) {
    return (
      <Form
        className="flex w-full flex-col items-start gap-4 md:flex-row"
        form={form}
        onSubmit={(input) =>
          handleSubmit({ input, cardId: card?.id as string })
        }
      >
        <Input className="h-9" {...form.register("title")} />
        <div className="flex w-full justify-end gap-4 md:w-fit">
          <Button size="xs" type="submit">
            Update
          </Button>
          <Button size="xs" variant="secondary" onClick={() => toggleEdit()}>
            Cancel
          </Button>
        </div>
      </Form>
    );
  }

  return (
    <div className="flex w-full max-w-[calc(100%-3.75rem)] items-start justify-between">
      {isLoading ? (
        <>
          <TextSkeleton className="h-9 max-w-xs" fluid />
          <ButtonSkeleton className="ml-2 w-12" size="xs" />
        </>
      ) : (
        <>
          <h1 className="truncate text-3xl font-bold">{card?.title}</h1>
          <Button
            size="xs"
            variant="secondary"
            onClick={() => toggleEdit(card)}
          >
            Edit
          </Button>
        </>
      )}
    </div>
  );
};
