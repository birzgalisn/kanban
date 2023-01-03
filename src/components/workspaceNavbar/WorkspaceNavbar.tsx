import React from "react";

import { Avatar } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { VerticalDivider } from "@/ui/verticalDivider";
import clsx from "clsx";
import {
  HiOutlineGlobeEuropeAfrica,
  HiOutlineServer,
  HiOutlineStar,
  HiOutlineUserPlus,
} from "react-icons/hi2";
import { AvatarSkeleton, TextSkeleton } from "../skeleton";

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
  return (
    <div className="flex h-16 w-full items-center border-b border-gray-200 bg-white px-6 py-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex max-w-fit items-center gap-2">
          {isLoading ? (
            <TextSkeleton className="h-9 w-52" />
          ) : (
            <h1 className="mr-12 text-3xl font-bold">{title}</h1>
          )}
          <div className="hidden max-w-fit items-center gap-2 xs:flex">
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
      <div className="ml-6 flex items-center">
        {isLoading
          ? Array(5)
              .fill(0)
              .map((_, idx) => {
                const isEven = idx % 2;
                return (
                  <AvatarSkeleton
                    key={idx}
                    className={clsx("-ml-3 h-8 w-8", isEven && "bg-gray-100")}
                  />
                );
              })
          : members &&
            members.map((member) => (
              <Avatar
                className="-ml-3"
                key={member.id}
                src={member.user.image}
                sizes="w-8 h-8"
              />
            ))}
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
