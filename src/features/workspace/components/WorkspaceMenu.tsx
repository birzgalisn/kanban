import { useRouter } from "next/router";
import React from "react";

import { ButtonSkeleton } from "@/components/skeleton";
import { ActiveLink } from "@/ui/activeLink";
import { Button } from "@/ui/button";
import { HiOutlinePlus } from "react-icons/hi2";

type Board = { __typename?: string; id: string; title: string };

export const WorkspaceMenu: React.FC<{
  boards?: Array<Board>;
  isBoardsLoading: boolean;
}> = ({ boards, isBoardsLoading }) => {
  const workspaceId = useRouter().query.workspaceId;
  const boardCount = boards?.length ?? 3;

  return (
    <div className="flex min-w-fit max-w-xs flex-col gap-2 whitespace-normal border-r border-gray-200 bg-white p-6">
      <p className="w-fit text-sm font-semibold">Menu</p>
      <h1 className="w-52 font-bold">All boards ({boardCount})</h1>
      <div className="flex h-full flex-col gap-2 overflow-y-scroll scroll-smooth">
        {isBoardsLoading
          ? Array(3)
              .fill(0)
              .map((_, idx) => <ButtonSkeleton key={idx} size="sm" fluid />)
          : boards &&
            boards?.map((board) => (
              <ActiveLink
                key={board.id}
                title={board.title}
                href={`/workspaces/${workspaceId}/boards/${board.id}`}
              />
            ))}
        <Button
          startIcon={<HiOutlinePlus className="h-4 w-4" />}
          size="sm"
          fluid
        >
          Board
        </Button>
      </div>
    </div>
  );
};
