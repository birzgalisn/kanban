import React from "react";

import { useEditBoardTitle } from "../hooks/useEditBoardTitle";

import type { WorkspaceQuery } from "../hooks/__generated__/useWorkspace.generated";

import { Form, Input } from "@/components/form";
import { Modal } from "@/components/modal";
import { Section } from "@/components/section";
import { BoardButton } from "@/ui/boardButton";
import { Button } from "@/ui/button";
import { Board } from "./Board";
import { BoardPreview } from "./BoardPreview";

type Boards = WorkspaceQuery["workspace"]["boards"];

export type BoardsProps = {
  isLoading: boolean;
  boards?: Boards;
  openCreateBoard: () => void;
};

export const Boards: React.FC<BoardsProps> = ({
  isLoading,
  boards,
  openCreateBoard,
}) => {
  const [form, handleSubmit, editOnBoard, modalRef, openEditModal] =
    useEditBoardTitle();

  return (
    <Section>
      <h2 className="mb-4 text-xl font-semibold">Select board to view</h2>
      <div className="mb-4 flex h-full w-full flex-col items-center rounded-lg border">
        {!isLoading && boards
          ? boards.map((board) => (
              <Board
                key={board.id}
                board={board}
                openEditModal={openEditModal}
              />
            ))
          : Array(4)
              .fill(0)
              .map((_, idx) => <BoardPreview key={idx} />)}
      </div>
      <BoardButton
        className="h-28 min-w-full sm:h-16"
        title="Create a new board"
        onClick={openCreateBoard}
      />
      <Modal
        title={`Edit ${editOnBoard.title} title`}
        subtitle="There is nothing pernament except change"
        ref={modalRef}
      >
        <Form form={form} onSubmit={handleSubmit}>
          <Input
            label="Title"
            placeholder="Enter the new board title"
            {...form.register("title")}
            autoFocus
          />
          <Button type="submit">Edit</Button>
        </Form>
      </Modal>
    </Section>
  );
};
