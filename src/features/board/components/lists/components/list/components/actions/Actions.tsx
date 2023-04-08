import React from 'react';

import type { ListProps } from '../../List';

import { Dropdown, DropdownGroup, DropdownItem } from '@/components/dropdown';
import { Button } from '@/ui/button';
import {
  HiEllipsisHorizontal,
  HiOutlineArchiveBox,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi2';

type ActionsProps = {
  list: ListProps['list'];
  renameList: ListProps['renameList'];
  deleteList: ListProps['deleteList'];
};

export const Actions: React.FC<ActionsProps> = ({ list, renameList, deleteList }) => {
  return (
    <Dropdown button={<Button icon={<HiEllipsisHorizontal />} variant="transparent" size="xs" />}>
      <DropdownGroup>
        <DropdownItem>
          <Button
            icon={<HiOutlinePencil />}
            variant="transparent"
            size="xs"
            fluid
            left
            onClick={() => renameList({ id: list.id, title: list.title })}
          >
            Rename
          </Button>
        </DropdownItem>
      </DropdownGroup>
      <DropdownGroup>
        <DropdownItem>
          <Button
            icon={<HiOutlineArchiveBox />}
            variant="transparent"
            size="xs"
            fluid
            left
            disabled
          >
            Achive
          </Button>
        </DropdownItem>
        <DropdownItem>
          <Button
            icon={<HiOutlineTrash />}
            variant="danger"
            size="xs"
            fluid
            left
            onClick={() => deleteList({ id: list.id })}
          >
            Delete
          </Button>
        </DropdownItem>
      </DropdownGroup>
    </Dropdown>
  );
};
