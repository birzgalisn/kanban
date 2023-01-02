import { signOut, useSession } from "next-auth/react";
import React from "react";

import { Avatar } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Logo } from "@/ui/logo";
import {
  HiOutlineArrowLeftOnRectangle,
  HiOutlineBell,
  HiOutlineHome,
} from "react-icons/hi2";
import { ActiveLink } from "./components/ActiveLink";
import { VerticalDivider } from "./components/VerticalDivider";

export const Navbar: React.FC<{}> = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex h-20 w-full items-center border-b border-gray-200 bg-white px-6 py-2">
      <Logo className="mr-4" wrap width={21} height={21} href="/workspaces" />
      <div className="flex w-full items-center justify-between">
        <div className="flex min-w-fit items-center gap-4">
          <VerticalDivider />
          <ActiveLink
            icon={<HiOutlineHome className="h-5 w-5" />}
            title="Workspaces"
            href="/workspaces"
          />
        </div>
        {user && (
          <div className="ml-4 flex items-center justify-end gap-4">
            <Button
              startIcon={<HiOutlineBell className="h-5 w-5" />}
              variant="transparent"
              size="sm"
              disabled
            />
            <div className="relative">
              <Avatar src={user?.image} alt={user?.name} sizes="w-8 h-8" />
              <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></div>
            </div>
            <Button
              startIcon={<HiOutlineArrowLeftOnRectangle className="h-5 w-5" />}
              variant="transparent"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
            />
          </div>
        )}
      </div>
    </div>
  );
};