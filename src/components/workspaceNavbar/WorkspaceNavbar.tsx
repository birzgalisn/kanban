import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import type { Members } from "../workspaceLayout";

import { Avatar } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { VerticalDivider } from "@/ui/verticalDivider";
import {
  HiOutlineArrowUturnLeft,
  HiOutlineGlobeEuropeAfrica,
  HiOutlineServer,
  HiOutlineStar,
  HiOutlineUserPlus,
} from "react-icons/hi2";
import { AvatarGroupSkeleton, TextSkeleton } from "../skeleton";

export const WorkspaceNavbar: React.FC<{
  isLoading: boolean;
  title?: string;
  members?: Members;
}> = ({ isLoading, title, members }) => {
  const router = useRouter();
  const isInBoardPage = router.asPath.match("boards");
  const workspaceId = router.query.workspaceId as string;

  return (
    <div className="flex h-16 w-full items-center border-b border-gray-200 bg-white px-6 py-2">
      {isInBoardPage && (
        <Link href={`/workspaces/${workspaceId}`}>
          <Button
            variant="transparent"
            size="sm"
            startIcon={<HiOutlineArrowUturnLeft className="h-4 w-4" />}
          />
        </Link>
      )}
      {isLoading ? (
        <TextSkeleton className="h-9 w-52" />
      ) : (
        <div className="flex w-80 flex-auto">
          <h1 className="truncate text-3xl font-bold">{title}</h1>
        </div>
      )}
      {!isInBoardPage && (
        <div className="hidden w-full items-center justify-between xs:flex">
          <div className="hidden max-w-fit items-center gap-2 lg:flex">
            <Button
              variant="transparent"
              size="sm"
              startIcon={<HiOutlineStar className="h-4 w-4" />}
              disabled
            />
            <VerticalDivider />
            <Button
              variant="transparent"
              size="sm"
              startIcon={<HiOutlineGlobeEuropeAfrica className="h-4 w-4" />}
              wrap
              disabled
            >
              Private
            </Button>
            <VerticalDivider />
            <Button
              variant="transparent"
              size="sm"
              startIcon={<HiOutlineServer className="h-4 w-4" />}
              disabled
            />
          </div>
          <div className="ml-6 flex items-center">
            {isLoading ? (
              <AvatarGroupSkeleton count={5} size="-ml-3 h-8 w-8" />
            ) : (
              members &&
              members.map((member) => (
                <Avatar
                  className="-ml-3"
                  key={member.id}
                  src={member.user.image}
                  size="w-8 h-8"
                />
              ))
            )}
            <Button
              className="ml-4"
              size="sm"
              variant="transparent"
              startIcon={<HiOutlineUserPlus className="h-4 w-4" />}
              disabled
            />
          </div>
        </div>
      )}
    </div>
  );
};
