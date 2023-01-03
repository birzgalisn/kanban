import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

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

type Member = {
  __typename?: string;
  id: string;
  user: {
    __typename?: string;
    image?: string | null;
  };
};

export const WorkspaceNavbar: React.FC<{
  title?: string | React.ReactElement;
  members?: Array<Member>;
  isLoading: boolean;
}> = ({ title, members, isLoading }) => {
  const router = useRouter();
  const isInBoardPage = router.asPath.match("boards");
  const workspaceId = router.query.workspaceId;

  return (
    <div className="flex h-16 w-full items-center border-b border-gray-200 bg-white px-6 py-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex max-w-fit items-center gap-2">
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
            <h1 className="truncate text-3xl font-bold md:mr-12">{title}</h1>
          )}
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
        </div>
      </div>
      <div className="hidden items-center xs:ml-6 xs:flex">
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
  );
};
