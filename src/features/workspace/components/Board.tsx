import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { useDeleteBoard } from '../hooks/useDeleteBoard';

import type { WorkspaceQuery } from '../hooks/__generated__/useWorkspace.generated';

import { Dropdown, DropdownGroup, DropdownItem } from '@/components/dropdown';
import { Button } from '@/ui/button';
import {
  HiEllipsisVertical,
  HiOutlinePencil,
  HiOutlineQueueList,
  HiOutlineTrash,
  HiOutlineViewColumns,
} from 'react-icons/hi2';
import type { EditModalProps } from '../hooks/useEditBoardTitle';

type Board = WorkspaceQuery['workspace']['boards'][0];

type BoardProps = {
  board: Board;
  openEditModal: (props: EditModalProps) => void;
};

export const Board: React.FC<BoardProps> = ({ board, openEditModal }) => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;
  const deleteBoard = useDeleteBoard();

  return (
    <Link className="w-full" href={`/workspaces/${workspaceId}/boards/${board.id}`}>
      <div className="relative flex h-full w-full flex-col items-center border-b p-4 duration-300 ease-in-out last:border-b-0 hover:bg-gray-50 hover:opacity-80 sm:flex-row sm:pr-12">
        <div className="flex h-9 w-full items-center truncate pr-10 sm:flex-1 sm:pr-0">
          <p className="truncate pr-0 font-semibold sm:flex-1 sm:pr-2">{board.title}</p>
        </div>
        <div className="flex w-full gap-4 truncate px-0 sm:flex-1 sm:px-2">
          <p className="flex flex-row items-center gap-1">
            <HiOutlineViewColumns />
            Lists: {board.totalLists}
          </p>
          <p className="flex flex-row items-center gap-1">
            <HiOutlineQueueList /> Cards: {board.totalCards}
          </p>
        </div>
        <p className="flex w-full justify-start truncate pl-0 sm:flex-1 sm:justify-end sm:pl-2 sm:pr-4">
          {format(new Date(board.createdAt), 'PPP')}
        </p>
        <div className="absolute right-4 top-4 block sm:flex">
          <Dropdown
            button={<Button icon={<HiEllipsisVertical />} variant="transparent" size="xs" />}
          >
            <DropdownGroup>
              <DropdownItem>
                <Button
                  icon={<HiOutlinePencil />}
                  variant="transparent"
                  size="xs"
                  fluid
                  left
                  onClick={(e) => {
                    e.preventDefault();
                    openEditModal({ id: board.id, title: board.title });
                  }}
                >
                  Rename
                </Button>
              </DropdownItem>
            </DropdownGroup>
            <DropdownGroup>
              <DropdownItem>
                <Button
                  icon={<HiOutlineTrash />}
                  variant="danger"
                  size="xs"
                  fluid
                  left
                  onClick={(e) => {
                    e.preventDefault();
                    deleteBoard({ boardId: board.id });
                  }}
                >
                  Delete
                </Button>
              </DropdownItem>
            </DropdownGroup>
          </Dropdown>
        </div>
      </div>
    </Link>
  );
};
