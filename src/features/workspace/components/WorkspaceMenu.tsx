import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import type { ModalHandle } from "@/components/modal";
import { WorkspaceQuery } from "../hooks/__generated__/useWorkspace.generated";

import { ButtonSkeleton } from "@/components/skeleton";
import { Button } from "@/ui/button";
import { Counter } from "@/ui/counter";
import { HiPlus } from "react-icons/hi2";

type Board = WorkspaceQuery["workspace"]["boards"][0];

export const WorkspaceMenu: React.FC<{
  boards?: Array<Board>;
  isLoading: boolean;
  createBoardModalRef: React.RefObject<ModalHandle>;
}> = ({ boards, isLoading, createBoardModalRef }) => {
  const workspaceId = useRouter().query.workspaceId;
  const boardCount = boards?.length ?? 3;

  return (
    <div className="flex min-w-fit max-w-xs flex-col gap-2 whitespace-normal border-r border-gray-200 bg-white p-6">
      <div className="mt-6 flex w-52 items-center">
        <h2 className="text-lg font-bold">All boards</h2>
        <Counter value={boardCount} />
      </div>
      <div className="flex h-full flex-col gap-1 overflow-hidden overflow-y-auto scroll-smooth">
        {isLoading
          ? Array(boardCount)
              .fill(0)
              .map((_, idx) => <ButtonSkeleton key={idx} size="sm" fluid />)
          : boards &&
            boards.map((board) => (
              <Link
                key={board.id}
                href={`/workspaces/${workspaceId}/boards/${board.id}`}
              >
                <Button variant="transparent" size="sm" fluid left>
                  {board.title}
                </Button>
              </Link>
            ))}
        <Button
          icon={<HiPlus />}
          size="sm"
          fluid
          left
          onClick={() => {
            if (createBoardModalRef.current) {
              createBoardModalRef.current.toggleVisibility();
            }
          }}
        >
          Board
        </Button>
      </div>
    </div>
  );
};
