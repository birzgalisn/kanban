import React from "react";

import { useEditDescription } from "./hooks";

import type { Card } from "../../CardDrawer";

import { Form, Textarea } from "@/components/form";
import { Button } from "@/ui/button";

export const Description: React.FC<{
  isLoading: boolean;
  card?: Card;
}> = ({ isLoading, card }) => {
  const [form, handleSubmit, isCardDescriptionInEdit, toggleEdit] =
    useEditDescription();

  if (isCardDescriptionInEdit) {
    return (
      <Form
        className="flex flex-col gap-4"
        form={form}
        onSubmit={(input) =>
          handleSubmit({ input, cardId: card?.id as string })
        }
      >
        <div className="flex h-9 items-center justify-between">
          <h2 className="text-lg font-medium">Description</h2>
        </div>
        <Textarea
          {...form.register("description")}
          wrap="hard"
          rows={4}
          spellCheck
        />
        <div className="flex w-full justify-end gap-4">
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
    <div className="flex flex-col gap-4">
      <div className="flex h-9 items-center justify-between">
        <h2 className="text-lg font-medium">Description</h2>
        <Button size="xs" variant="secondary" onClick={() => toggleEdit(card)}>
          Edit
        </Button>
      </div>
      <p className="whitespace-pre-line">
        {card?.description ?? "No description provided"}
      </p>
    </div>
  );
};
