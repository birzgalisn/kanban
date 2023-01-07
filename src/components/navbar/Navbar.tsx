import { signOut, useSession } from "next-auth/react";
import React from "react";

import { Avatar } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Logo } from "@/ui/logo";
import { HiOutlineArrowLeftOnRectangle, HiOutlineBell } from "react-icons/hi2";

export const Navbar: React.FC<{}> = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-6 py-2">
      <Logo className="mr-4" wrap width={21} height={21} href="/workspaces" />
      {user && (
        <div className="ml-4 flex items-center gap-4">
          <Button
            startIcon={<HiOutlineBell className="h-4 w-4" />}
            variant="transparent"
            size="sm"
            disabled
          />
          <div className="relative">
            <Avatar src={user?.image} alt={user?.name} size="w-8 h-8" />
            <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></div>
          </div>
          <Button
            startIcon={<HiOutlineArrowLeftOnRectangle className="h-4 w-4" />}
            variant="transparent"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          />
        </div>
      )}
    </div>
  );
};
