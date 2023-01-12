import { format } from "date-fns";
import React from "react";

import type { MembersQuery } from "@/features/workspaceMembers/hooks/__generated__/useMembers.generated";

import { useRemoveMember, useTransferOwnership } from "../hooks";

import { Dropdown, DropdownGroup, DropdownItem } from "@/components/dropdown";
import { Avatar } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { useSession } from "next-auth/react";
import {
  HiEllipsisVertical,
  HiOutlineKey,
  HiOutlineUserMinus,
} from "react-icons/hi2";

type Member = MembersQuery["members"][0];

type MemberProps = {
  workspaceOwner?: Member;
  member: Member;
};

export const Member: React.FC<MemberProps> = ({ workspaceOwner, member }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const transferOwnership = useTransferOwnership();

  const removeMember = useRemoveMember();

  return (
    <div className="relative flex h-full w-full flex-col items-center border-b p-4 last:border-b-0 sm:flex-row sm:pr-12">
      <div className="flex h-9 w-full items-center truncate pr-10 sm:flex-1 sm:pr-2">
        <Avatar
          className="shrink-0"
          src={member.user.image}
          alt={member.user.name}
          size="w-7 h-7"
        />
        <p className="truncate pl-2 font-semibold sm:flex-1">
          {member.user.name}
        </p>
      </div>
      <p className="flex w-full truncate sm:flex-1 sm:pl-2">
        {member.user.email}
      </p>
      <p className="flex w-full justify-start truncate sm:flex-1 sm:justify-end sm:pr-4">
        {format(new Date(member.createdAt), "PPP")}
      </p>
      {userId === workspaceOwner?.user.id && member.user.id !== userId ? (
        <div className="absolute top-4 right-4 block sm:flex">
          <Dropdown
            button={
              <Button
                icon={<HiEllipsisVertical />}
                variant="transparent"
                size="xs"
              />
            }
          >
            <DropdownGroup>
              <DropdownItem>
                <Button
                  icon={<HiOutlineKey />}
                  variant="transparent"
                  size="xs"
                  fluid
                  left
                  onClick={() =>
                    transferOwnership({
                      memberId: member.id,
                      ownerId: userId,
                    })
                  }
                >
                  Transfer ownership
                </Button>
              </DropdownItem>
            </DropdownGroup>
            <DropdownGroup>
              <DropdownItem>
                <Button
                  icon={<HiOutlineUserMinus />}
                  variant="danger"
                  size="xs"
                  fluid
                  left
                  onClick={() => removeMember({ memberId: member.id })}
                >
                  Remove
                </Button>
              </DropdownItem>
            </DropdownGroup>
          </Dropdown>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
